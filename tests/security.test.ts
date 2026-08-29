import { describe, expect, it } from 'vitest'
import { canAccessOrganization, canManageRole } from '@/lib/tenant-security'

describe('foundation authorization', () => {
  it('rejects unauthenticated or unknown organization access', () => {
    expect(canAccessOrganization('', { organizationId: 'org-a' })).toBe(false)
    expect(canAccessOrganization('org-a', { organizationId: 'org-b' })).toBe(false)
  })

  it('isolates two organizations', () => {
    const orgAUser = 'org-a'
    const orgALead = { organizationId: 'org-a' }
    const orgBLead = { organizationId: 'org-b' }
    expect(canAccessOrganization(orgAUser, orgALead)).toBe(true)
    expect(canAccessOrganization(orgAUser, orgBLead)).toBe(false)
  })

  it('enforces role hierarchy', () => {
    expect(canManageRole('member', 'member')).toBe(true)
    expect(canManageRole('member', 'admin')).toBe(false)
    expect(canManageRole('admin', 'admin')).toBe(true)
    expect(canManageRole('owner', 'owner')).toBe(true)
  })
})
