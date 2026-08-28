import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { organizationMembers, organizations } from '@/lib/db/schema'

export async function ensureDefaultOrganization(userId: string, name: string) {
  const existing = await db.select({ organizationId: organizationMembers.organizationId })
    .from(organizationMembers).where(eq(organizationMembers.userId, userId)).limit(1)
  if (existing[0]) return existing[0].organizationId

  const slug = `workspace-${userId.slice(0, 8)}`
  const [organization] = await db.insert(organizations).values({
    id: crypto.randomUUID(), name: `${name}'s Workspace`, slug,
  }).returning({ id: organizations.id })
  await db.insert(organizationMembers).values({ organizationId: organization.id, userId, role: 'owner' })
  return organization.id
}

export async function getMembership(userId: string) {
  return db.select({ organization: organizations, membership: organizationMembers })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizations.id, organizationMembers.organizationId))
    .where(eq(organizationMembers.userId, userId)).limit(1)
}
