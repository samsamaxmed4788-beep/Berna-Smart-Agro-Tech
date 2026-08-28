'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { campaigns, contentCalendarItems } from '@/lib/db/schema'
import { getMembership } from '@/lib/organization'
import { eq } from 'drizzle-orm'

async function context() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  const membership = await getMembership(session.user.id)
  if (!membership[0]) throw new Error('Organization membership required')
  return { userId: session.user.id, organizationId: membership[0].organization.id }
}

export async function createCampaign(input: { name: string; objective: string; budgetCents: number }) {
  const { userId, organizationId } = await context()
  if (!input.name.trim() || input.name.trim().length > 120) throw new Error('Campaign name is required')
  if (!Number.isInteger(input.budgetCents) || input.budgetCents < 0) throw new Error('Invalid budget')
  await db.insert(campaigns).values({ id: crypto.randomUUID(), organizationId, createdBy: userId, name: input.name.trim(), objective: input.objective.trim().slice(0, 500), budgetCents: input.budgetCents })
  revalidatePath('/')
}

export async function createCalendarItem(input: { title: string; channel: string; scheduledFor?: string }) {
  const { userId, organizationId } = await context()
  const channels = ['email', 'social', 'search', 'content', 'webinar']
  if (!input.title.trim() || !channels.includes(input.channel)) throw new Error('Invalid calendar item')
  await db.insert(contentCalendarItems).values({ id: crypto.randomUUID(), organizationId, createdBy: userId, title: input.title.trim().slice(0, 160), channel: input.channel, scheduledFor: input.scheduledFor ? new Date(input.scheduledFor) : null })
  revalidatePath('/')
}

export async function listMarketingData() {
  const { organizationId } = await context()
  return { campaigns: await db.select().from(campaigns).where(eq(campaigns.organizationId, organizationId)), calendar: await db.select().from(contentCalendarItems).where(eq(contentCalendarItems.organizationId, organizationId)) }
}
