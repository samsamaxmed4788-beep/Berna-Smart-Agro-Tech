'use server'

import { and, eq, gte, lte } from 'drizzle-orm'
import { db } from '@/lib/db'
import { campaignChannels, campaigns, leads } from '@/lib/db/schema'
import { requireOrganizationContext } from '@/lib/authorization'
import { calculateMetrics, dateBounds } from '@/lib/analytics'

export type AnalyticsFilters = { period?: string; from?: string; to?: string }

export async function getAnalytics(filters: AnalyticsFilters = {}) {
  const { organizationId } = await requireOrganizationContext('member')
  const { start, end } = dateBounds(filters.period ?? '30d', filters.from, filters.to)
  const dateWhere = and(gte(leads.createdAt, start), lte(leads.createdAt, end))
  const [campaignRows, channelRows, leadRows] = await Promise.all([
    db.select().from(campaigns).where(eq(campaigns.organizationId, organizationId)),
    db.select().from(campaignChannels).where(and(eq(campaignChannels.organizationId, organizationId), gte(campaignChannels.createdAt, start), lte(campaignChannels.createdAt, end))),
    db.select({ id: leads.id, campaignId: leads.campaignId, status: leads.status, valueCents: leads.valueCents, source: leads.source }).from(leads).where(and(eq(leads.organizationId, organizationId), dateWhere)),
  ])
  const base = leadRows.reduce((sum, lead) => ({ ...sum, leads: sum.leads + 1, conversions: sum.conversions + (lead.status === 'won' ? 1 : 0), revenueCents: sum.revenueCents + (lead.status === 'won' ? Math.max(0, lead.valueCents) : 0) }), { spendCents: 0, leads: 0, conversions: 0, revenueCents: 0 })
  const spend = channelRows.reduce((sum, row) => sum + Math.max(0, row.spendCents), 0)
  const totals = calculateMetrics({ ...base, spendCents: spend })
  const campaignsReport = campaignRows.map(campaign => {
    const rows = leadRows.filter(lead => lead.campaignId === campaign.id)
    const channels = channelRows.filter(channel => channel.campaignId === campaign.id)
    return { id: campaign.id, name: campaign.name, ...calculateMetrics({ spendCents: channels.reduce((s, c) => s + Math.max(0, c.spendCents), 0), leads: rows.length, conversions: rows.filter(l => l.status === 'won').length, revenueCents: rows.filter(l => l.status === 'won').reduce((s, l) => s + Math.max(0, l.valueCents), 0) }) }
  })
  const channelReport = [...new Set(channelRows.map(row => row.channel))].map(channel => {
    const channels = channelRows.filter(row => row.channel === channel)
    const campaignIds = new Set(channels.map(row => row.campaignId))
    const rows = leadRows.filter(lead => lead.campaignId && campaignIds.has(lead.campaignId))
    return { channel, ...calculateMetrics({ spendCents: channels.reduce((s, c) => s + Math.max(0, c.spendCents), 0), leads: rows.length, conversions: rows.filter(l => l.status === 'won').length, revenueCents: rows.filter(l => l.status === 'won').reduce((s, l) => s + Math.max(0, l.valueCents), 0) }) }
  })
  return { period: { start: start.toISOString(), end: end.toISOString() }, totals, campaigns: campaignsReport, channels: channelReport }
}

export async function calculateCampaignROI(campaignId: string, filters: AnalyticsFilters = {}) {
  const data = await getAnalytics(filters)
  return data.campaigns.find(campaign => campaign.id === campaignId) ?? null
}

export async function calculateOrganizationROI(filters: AnalyticsFilters = {}) { return (await getAnalytics(filters)).totals }
export async function calculateChannelPerformance(filters: AnalyticsFilters = {}) { return (await getAnalytics(filters)).channels }
