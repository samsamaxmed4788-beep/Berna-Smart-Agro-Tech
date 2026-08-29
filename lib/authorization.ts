import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { organizationMembers } from '@/lib/db/schema'

export type OrganizationRole = 'owner' | 'admin' | 'member'

export async function requireOrganizationContext(minimumRole: OrganizationRole = 'member') {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  const membership = await db.select({ organizationId: organizationMembers.organizationId, role: organizationMembers.role })
    .from(organizationMembers).where(eq(organizationMembers.userId, session.user.id)).limit(1)
  const current = membership[0]
  if (!current) throw new Error('Organization membership required')
  const rank: Record<OrganizationRole, number> = { member: 1, admin: 2, owner: 3 }
  if ((rank[current.role as OrganizationRole] ?? 0) < rank[minimumRole]) throw new Error('Forbidden')
  return { userId: session.user.id, organizationId: current.organizationId, role: current.role as OrganizationRole }
}

export function isOrganizationRole(role: string): role is OrganizationRole {
  return role === 'owner' || role === 'admin' || role === 'member'
}

export function tenantPredicate<T extends { organizationId: unknown }>(table: T, organizationId: string) {
  return eq(table.organizationId as never, organizationId)
}
