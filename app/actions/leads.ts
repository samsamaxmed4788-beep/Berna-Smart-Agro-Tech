'use server'

import { and, desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { requireOrganizationContext } from '@/lib/authorization'

async function getContext() {
  return requireOrganizationContext('member')
}

export async function listLeads() {
  const { organizationId } = await getContext()
  return db.select().from(leads).where(eq(leads.organizationId, organizationId)).orderBy(desc(leads.createdAt))
}

export async function createLead(input: {
  firstName: string; lastName?: string; email?: string; company?: string; source?: string; valueCents?: number
}) {
  const { userId, organizationId } = await getContext()
  const firstName = input.firstName.trim()
  if (!firstName || firstName.length > 80) throw new Error('First name is required')
  const email = input.email?.trim().toLowerCase()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email')
  const valueCents = Math.max(0, Math.min(100_000_000, Math.floor(input.valueCents ?? 0)))
  await db.insert(leads).values({ id: crypto.randomUUID(), organizationId, createdBy: userId, firstName, lastName: input.lastName?.trim() || null, email: email || null, company: input.company?.trim() || null, source: input.source?.trim() || null, valueCents })
  revalidatePath('/')
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost') {
  const { organizationId } = await getContext()
  if (!id || !status) throw new Error('Invalid lead update')
  await db.update(leads).set({ status, updatedAt: new Date() }).where(and(eq(leads.id, id), eq(leads.organizationId, organizationId)))
  revalidatePath('/')
}
