export type TenantRecord = { organizationId: string }

export function canAccessOrganization(userOrganizationId: string, record: TenantRecord) {
  return userOrganizationId.length > 0 && userOrganizationId === record.organizationId
}

export function canManageRole(role: string, minimum: 'member' | 'admin' | 'owner') {
  const rank = { member: 1, admin: 2, owner: 3 } as const
  return role in rank && rank[role as keyof typeof rank] >= rank[minimum]
}
