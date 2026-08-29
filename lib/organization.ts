import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { organizationMembers, organizations } from '@/lib/db/schema'

export async function ensureDefaultOrganization(userId: string, name: string) {
  return db.transaction(async (tx) => {
    const existing = await tx.select({ organizationId: organizationMembers.organizationId })
      .from(organizationMembers).where(eq(organizationMembers.userId, userId)).limit(1)
    if (existing[0]) return existing[0].organizationId
    const slug = `workspace-${userId.slice(0, 8)}`
    const [organization] = await tx.insert(organizations).values({
      id: crypto.randomUUID(), name: `${name}'s Workspace`, slug,
    }).onConflictDoNothing({ target: organizations.slug }).returning({ id: organizations.id })
    if (organization) {
      await tx.insert(organizationMembers).values({ organizationId: organization.id, userId, role: 'owner' }).onConflictDoNothing()
      return organization.id
    }
    const retry = await tx.select({ organizationId: organizationMembers.organizationId }).from(organizationMembers).where(eq(organizationMembers.userId, userId)).limit(1)
    if (!retry[0]) throw new Error('Organization initialization failed')
    return retry[0].organizationId
  })
}

export async function getMembership(userId: string) {
  return db.select({ organization: organizations, membership: organizationMembers })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizations.id, organizationMembers.organizationId))
    .where(eq(organizationMembers.userId, userId)).limit(1)
}
