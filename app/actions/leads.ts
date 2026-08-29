'use server'

import { and, desc, eq, ilike, or } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { leadNotes, leads, organizationMembers, user } from '@/lib/db/schema'
import { requireOrganizationContext } from '@/lib/authorization'

const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const
type Status = (typeof statuses)[number]
const clean = (value: unknown, max = 200) => typeof value === 'string' ? value.trim().slice(0, max) : ''
const validEmail = (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
function ensureStatus(value: unknown): Status { if (typeof value !== 'string' || !statuses.includes(value as Status)) throw new Error('Invalid status'); return value as Status }
function ensureId(value: unknown) { const id = clean(value, 80); if (!id) throw new Error('Invalid record'); return id }
function ensureValue(value: unknown) { const n = typeof value === 'number' ? value : Number(value); if (!Number.isFinite(n) || n < 0 || n > 100000000) throw new Error('Invalid deal value'); return Math.floor(n) }
function revalidate() { revalidatePath('/') }

async function getLeadContext(role: 'member' | 'admin' = 'member') { return requireOrganizationContext(role) }

export async function listLeads(filters: { search?: string; status?: string; source?: string; assignedMemberId?: string } = {}) {
  const { organizationId } = await getLeadContext()
  const search = clean(filters.search, 100)
  const predicates = [eq(leads.organizationId, organizationId)]
  if (search) predicates.push(or(ilike(leads.firstName, `%${search}%`), ilike(leads.lastName, `%${search}%`), ilike(leads.email, `%${search}%`), ilike(leads.company, `%${search}%`))!)
  if (filters.status && filters.status !== 'all') predicates.push(eq(leads.status, ensureStatus(filters.status)))
  if (filters.source && filters.source !== 'all') predicates.push(eq(leads.source, clean(filters.source, 80)))
  if (filters.assignedMemberId && filters.assignedMemberId !== 'all') predicates.push(eq(leads.assignedMemberId, ensureId(filters.assignedMemberId)))
  return db.select().from(leads).where(and(...predicates)).orderBy(desc(leads.createdAt))
}

export async function getLead(id: string) {
  const { organizationId } = await getLeadContext()
  const rows = await db.select().from(leads).where(and(eq(leads.id, ensureId(id)), eq(leads.organizationId, organizationId))).limit(1)
  if (!rows[0]) throw new Error('Lead not found')
  const notes = await db.select({ id: leadNotes.id, body: leadNotes.body, authorId: leadNotes.authorId, createdAt: leadNotes.createdAt, updatedAt: leadNotes.updatedAt, authorName: user.name }).from(leadNotes).leftJoin(user, eq(user.id, leadNotes.authorId)).where(and(eq(leadNotes.leadId, rows[0].id), eq(leadNotes.organizationId, organizationId))).orderBy(desc(leadNotes.createdAt))
  return { lead: rows[0], notes }
}

export async function listOrganizationMembers() {
  const { organizationId } = await getLeadContext()
  return db.select({ id: user.id, name: user.name, email: user.email, role: organizationMembers.role }).from(organizationMembers).innerJoin(user, eq(user.id, organizationMembers.userId)).where(eq(organizationMembers.organizationId, organizationId))
}

export async function createLead(input: { firstName: string; lastName?: string; email?: string; phone?: string; company?: string; source?: string; status?: string; valueCents?: number; notes?: string; assignedMemberId?: string | null }) {
  const { userId, organizationId } = await getLeadContext()
  const firstName = clean(input.firstName, 80); if (!firstName) throw new Error('First name is required')
  const email = clean(input.email, 160).toLowerCase(); if (!validEmail(email)) throw new Error('Enter a valid email')
  const status = input.status ? ensureStatus(input.status) : 'new'; const assignedMemberId = clean(input.assignedMemberId, 80) || null
  if (assignedMemberId) { const member = await db.select({ id: organizationMembers.userId }).from(organizationMembers).where(and(eq(organizationMembers.organizationId, organizationId), eq(organizationMembers.userId, assignedMemberId))).limit(1); if (!member[0]) throw new Error('Assigned member is not in this organization') }
  const [lead] = await db.insert(leads).values({ id: crypto.randomUUID(), organizationId, createdBy: userId, firstName, lastName: clean(input.lastName, 80) || null, email: email || null, phone: clean(input.phone, 40) || null, company: clean(input.company, 120) || null, source: clean(input.source, 80) || null, status, valueCents: ensureValue(input.valueCents ?? 0), notes: clean(input.notes, 5000) || null, assignedMemberId }).returning()
  revalidate(); return lead
}

export async function updateLead(id: string, input: { firstName: string; lastName?: string; email?: string; phone?: string; company?: string; source?: string; status?: string; valueCents?: number; notes?: string; assignedMemberId?: string | null }) {
  const { organizationId } = await getLeadContext(); const leadId = ensureId(id); const firstName = clean(input.firstName, 80); if (!firstName) throw new Error('First name is required'); const email = clean(input.email, 160).toLowerCase(); if (!validEmail(email)) throw new Error('Enter a valid email')
  const assignedMemberId = clean(input.assignedMemberId, 80) || null; if (assignedMemberId) { const member = await db.select({ id: organizationMembers.userId }).from(organizationMembers).where(and(eq(organizationMembers.organizationId, organizationId), eq(organizationMembers.userId, assignedMemberId))).limit(1); if (!member[0]) throw new Error('Assigned member is not in this organization') }
  const [lead] = await db.update(leads).set({ firstName, lastName: clean(input.lastName, 80) || null, email: email || null, phone: clean(input.phone, 40) || null, company: clean(input.company, 120) || null, source: clean(input.source, 80) || null, status: input.status ? ensureStatus(input.status) : undefined, valueCents: ensureValue(input.valueCents ?? 0), notes: clean(input.notes, 5000) || null, assignedMemberId, updatedAt: new Date() }).where(and(eq(leads.id, leadId), eq(leads.organizationId, organizationId))).returning(); if (!lead) throw new Error('Lead not found'); revalidate(); return lead
}

export async function updateLeadStatus(id: string, status: Status) { const { organizationId } = await getLeadContext(); const [lead] = await db.update(leads).set({ status: ensureStatus(status), updatedAt: new Date() }).where(and(eq(leads.id, ensureId(id)), eq(leads.organizationId, organizationId))).returning(); if (!lead) throw new Error('Lead not found'); revalidate(); return lead }
export async function deleteLead(id: string) { const { organizationId, role } = await getLeadContext('admin'); const leadId = ensureId(id); const [lead] = await db.delete(leads).where(and(eq(leads.id, leadId), eq(leads.organizationId, organizationId))).returning({ id: leads.id }); if (!lead) throw new Error('Lead not found'); await db.delete(leadNotes).where(and(eq(leadNotes.leadId, leadId), eq(leadNotes.organizationId, organizationId))); void role; revalidate(); return { id: lead.id } }
export async function addLeadNote(leadId: string, body: string) { const { userId, organizationId } = await getLeadContext(); const text = clean(body, 5000); if (!text) throw new Error('Note cannot be empty'); const lead = await db.select({ id: leads.id }).from(leads).where(and(eq(leads.id, ensureId(leadId)), eq(leads.organizationId, organizationId))).limit(1); if (!lead[0]) throw new Error('Lead not found'); const [note] = await db.insert(leadNotes).values({ id: crypto.randomUUID(), organizationId, leadId: lead[0].id, authorId: userId, body: text }).returning(); revalidate(); return note }
export async function deleteLeadNote(noteId: string) { const { userId, organizationId, role } = await getLeadContext(); const predicate = role === 'admin' ? and(eq(leadNotes.id, ensureId(noteId)), eq(leadNotes.organizationId, organizationId)) : and(eq(leadNotes.id, ensureId(noteId)), eq(leadNotes.organizationId, organizationId), eq(leadNotes.authorId, userId)); const [note] = await db.delete(leadNotes).where(predicate).returning({ id: leadNotes.id }); if (!note) throw new Error('Note not found'); revalidate(); return note }
