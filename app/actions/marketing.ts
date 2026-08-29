'use server'

import { revalidatePath } from 'next/cache'
import { and, desc, eq, ilike, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import { campaignChannels, campaigns, contentCalendarItems, organizationMembers } from '@/lib/db/schema'
import { requireOrganizationContext } from '@/lib/authorization'
import { campaignStatuses, contentStatuses, contentTypes, marketingChannels } from '@/lib/marketing-constants'

type CampaignInput = { name: string; description?: string; objective?: string; status?: string; startDate?: string; endDate?: string; budgetCents?: number; channels?: string[] }
type CalendarInput = { campaignId?: string | null; title: string; contentType?: string; channel: string; scheduledFor?: string | null; status?: string; content?: string; notes?: string }

function text(value: unknown, max: number) { return typeof value === 'string' ? value.trim().slice(0, max) : '' }
function validDate(value?: string | null) { if (!value) return null; return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) ? value : null }
function validStatus(value: unknown): typeof campaignStatuses[number] { return campaignStatuses.includes(value as never) ? value as typeof campaignStatuses[number] : 'draft' }
async function ctx(role: 'member' | 'admin' = 'member') { return requireOrganizationContext(role) }
async function ensureChannels(organizationId: string, campaignId: string, channels: string[]) {
  const selected = [...new Set(channels)].filter((channel): channel is typeof marketingChannels[number] => marketingChannels.includes(channel as never))
  if (selected.length > marketingChannels.length) throw new Error('Invalid channel selection')
  await db.delete(campaignChannels).where(and(eq(campaignChannels.organizationId, organizationId), eq(campaignChannels.campaignId, campaignId)))
  if (selected.length) await db.insert(campaignChannels).values(selected.map(channel => ({ id: crypto.randomUUID(), organizationId, campaignId, channel })))
}

export async function listMarketingData(filters: { search?: string; status?: string } = {}) {
  const { organizationId } = await ctx()
  const search = text(filters.search, 120)
  const campaignRows = await db.select().from(campaigns).where(and(eq(campaigns.organizationId, organizationId), search ? ilike(campaigns.name, `%${search}%`) : undefined)).orderBy(desc(campaigns.updatedAt))
  const channels = campaignRows.length ? await db.select().from(campaignChannels).where(and(eq(campaignChannels.organizationId, organizationId), inArray(campaignChannels.campaignId, campaignRows.map(c => c.id)))) : []
  const calendar = await db.select().from(contentCalendarItems).where(eq(contentCalendarItems.organizationId, organizationId)).orderBy(desc(contentCalendarItems.scheduledFor), desc(contentCalendarItems.updatedAt))
  return { campaigns: campaignRows, channels, calendar }
}

export async function createCampaign(input: CampaignInput) {
  const { userId, organizationId } = await ctx()
  const name = text(input.name, 120); const startDate = validDate(input.startDate); const endDate = validDate(input.endDate)
  if (!name) throw new Error('Campaign name is required'); if (input.startDate && !startDate) throw new Error('Invalid start date'); if (input.endDate && !endDate) throw new Error('Invalid end date'); if (startDate && endDate && startDate > endDate) throw new Error('End date must be after start date')
  const budgetCents = input.budgetCents ?? 0; if (!Number.isInteger(budgetCents) || budgetCents < 0 || budgetCents > 100_000_000_00) throw new Error('Invalid budget')
  const [campaign] = await db.insert(campaigns).values({ id: crypto.randomUUID(), organizationId, createdBy: userId, name, description: text(input.description, 2000) || null, objective: text(input.objective, 500) || null, status: validStatus(input.status), startDate, endDate, budgetCents }).returning()
  await ensureChannels(organizationId, campaign.id, input.channels ?? [])
  revalidatePath('/'); return campaign
}

export async function updateCampaign(id: string, input: CampaignInput) {
  const { organizationId } = await ctx(); const name = text(input.name, 120); if (!name) throw new Error('Campaign name is required')
  const startDate = validDate(input.startDate); const endDate = validDate(input.endDate); if (input.startDate && !startDate) throw new Error('Invalid start date'); if (input.endDate && !endDate) throw new Error('Invalid end date'); if (startDate && endDate && startDate > endDate) throw new Error('End date must be after start date')
  const budgetCents = input.budgetCents ?? 0; if (!Number.isInteger(budgetCents) || budgetCents < 0) throw new Error('Invalid budget')
  const [campaign] = await db.update(campaigns).set({ name, description: text(input.description, 2000) || null, objective: text(input.objective, 500) || null, status: validStatus(input.status), startDate, endDate, budgetCents, updatedAt: new Date() }).where(and(eq(campaigns.id, id), eq(campaigns.organizationId, organizationId))).returning()
  if (!campaign) throw new Error('Campaign not found'); await ensureChannels(organizationId, id, input.channels ?? []); revalidatePath('/'); return campaign
}

export async function deleteCampaign(id: string) { const { organizationId } = await ctx('admin'); const [deleted] = await db.delete(campaigns).where(and(eq(campaigns.id, id), eq(campaigns.organizationId, organizationId))).returning({ id: campaigns.id }); if (!deleted) throw new Error('Campaign not found'); revalidatePath('/') }
export async function updateCampaignStatus(id: string, status: string) { const { organizationId } = await ctx(); if (!campaignStatuses.includes(status as never)) throw new Error('Invalid campaign status'); const [row] = await db.update(campaigns).set({ status, updatedAt: new Date() }).where(and(eq(campaigns.id, id), eq(campaigns.organizationId, organizationId))).returning(); if (!row) throw new Error('Campaign not found'); revalidatePath('/'); return row }

export async function createCalendarItem(input: CalendarInput) { const { userId, organizationId } = await ctx(); const title = text(input.title, 160); if (!title || !marketingChannels.includes(input.channel as never) || !contentTypes.includes((input.contentType ?? 'other') as never)) throw new Error('Invalid content item'); const scheduledFor = input.scheduledFor ? new Date(input.scheduledFor) : null; if (scheduledFor && Number.isNaN(scheduledFor.getTime())) throw new Error('Invalid scheduled date'); if (input.campaignId) { const campaign = await db.select({ id: campaigns.id }).from(campaigns).where(and(eq(campaigns.id, input.campaignId), eq(campaigns.organizationId, organizationId))).limit(1); if (!campaign[0]) throw new Error('Campaign not found') } const [item] = await db.insert(contentCalendarItems).values({ id: crypto.randomUUID(), organizationId, createdBy: userId, campaignId: input.campaignId || null, title, channel: input.channel, status: contentStatuses.includes(input.status as never) ? input.status : 'idea', scheduledFor, brief: input.contentType ?? 'other', content: text(input.content, 5000) || null, notes: text(input.notes, 2000) || null }).returning(); revalidatePath('/'); return item }

export async function updateCalendarItem(id: string, input: CalendarInput) { const { organizationId } = await ctx(); const scheduledFor = input.scheduledFor ? new Date(input.scheduledFor) : null; if (scheduledFor && Number.isNaN(scheduledFor.getTime())) throw new Error('Invalid scheduled date'); if (!marketingChannels.includes(input.channel as never)) throw new Error('Invalid channel'); const [item] = await db.update(contentCalendarItems).set({ campaignId: input.campaignId || null, title: text(input.title, 160), channel: input.channel, status: contentStatuses.includes(input.status as never) ? input.status : 'idea', scheduledFor, brief: input.contentType ?? 'other', content: text(input.content, 5000) || null, notes: text(input.notes, 2000) || null, updatedAt: new Date() }).where(and(eq(contentCalendarItems.id, id), eq(contentCalendarItems.organizationId, organizationId))).returning(); if (!item) throw new Error('Content item not found'); revalidatePath('/'); return item }
export async function updateCalendarStatus(id: string, status: string) { const { organizationId } = await ctx(); if (!contentStatuses.includes(status as never)) throw new Error('Invalid content status'); const [item] = await db.update(contentCalendarItems).set({ status, updatedAt: new Date() }).where(and(eq(contentCalendarItems.id, id), eq(contentCalendarItems.organizationId, organizationId))).returning(); if (!item) throw new Error('Content item not found'); revalidatePath('/'); return item }
export async function deleteCalendarItem(id: string) { const { organizationId } = await ctx('admin'); const [item] = await db.delete(contentCalendarItems).where(and(eq(contentCalendarItems.id, id), eq(contentCalendarItems.organizationId, organizationId))).returning({ id: contentCalendarItems.id }); if (!item) throw new Error('Content item not found'); revalidatePath('/') }
export async function listOrganizationMembers() { const { organizationId } = await ctx(); return db.select({ userId: organizationMembers.userId, role: organizationMembers.role }).from(organizationMembers).where(eq(organizationMembers.organizationId, organizationId)) }

export type { CampaignInput, CalendarInput }
