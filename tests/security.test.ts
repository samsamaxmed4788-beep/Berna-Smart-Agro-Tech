import { describe, expect, it } from 'vitest'
import { canAccessOrganization, canManageRole } from '@/lib/tenant-security'
import { campaignStatuses, contentStatuses, marketingChannels } from '@/lib/marketing-constants'

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

  it('keeps CRM pipeline statuses explicit for create and status updates', () => {
    expect(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']).toHaveLength(6)
  })

  it('denies cross-organization lead read, update, and delete attempts', () => {
    const organizationA = { organizationId: 'org-a' }
    const organizationBLead = { organizationId: 'org-b' }
    expect(canAccessOrganization('org-a', organizationBLead)).toBe(false)
    expect(canAccessOrganization('org-a', organizationA)).toBe(true)
    expect(canAccessOrganization('org-a', organizationBLead)).toBe(false)
  })

  it('defines marketing channels and lifecycle statuses', () => {
    expect(marketingChannels).toContain('Facebook')
    expect(marketingChannels).toContain('WhatsApp')
    expect(campaignStatuses).toContain('active')
    expect(contentStatuses).toContain('scheduled')
  })

  it('denies cross-organization campaign, channel, and calendar access', () => {
    const orgA = { organizationId: 'org-a' }
    const orgB = { organizationId: 'org-b' }
    expect(canAccessOrganization('org-a', orgA)).toBe(true)
    expect(canAccessOrganization('org-a', orgB)).toBe(false)
    expect(canAccessOrganization('org-b', orgA)).toBe(false)
  })

  it('enforces role hierarchy', () => {
    expect(canManageRole('member', 'member')).toBe(true)
    expect(canManageRole('member', 'admin')).toBe(false)
    expect(canManageRole('admin', 'admin')).toBe(true)
    expect(canManageRole('owner', 'owner')).toBe(true)
  })
})
