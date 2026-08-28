'use client'

import { useState } from 'react'
import { createLead, updateLeadStatus } from '@/app/actions/leads'
import { Plus, UserRound, X } from 'lucide-react'

type Lead = { id: string; firstName: string; lastName: string | null; email: string | null; company: string | null; status: string; score: number; valueCents: number }

const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const

export function LeadsPanel({ initialLeads = [] }: { initialLeads?: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function submit(formData: FormData) {
    setSaving(true); setError('')
    try {
      await createLead({ firstName: String(formData.get('firstName') || ''), lastName: String(formData.get('lastName') || ''), email: String(formData.get('email') || ''), company: String(formData.get('company') || ''), source: String(formData.get('source') || ''), valueCents: Number(formData.get('valueCents') || 0) * 100 })
      setOpen(false); window.location.reload()
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not create lead') } finally { setSaving(false) }
  }

  return <section className="space-y-4">
    <div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Revenue engine</p><h2 className="mt-1 text-lg font-semibold">Leads & CRM</h2></div><button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" />Add lead</button></div>
    <div className="grid gap-3 sm:grid-cols-3">{statuses.slice(0, 3).map((status) => <div key={status} className="rounded-lg border border-border bg-card p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{status}</p><p className="mt-2 text-2xl font-semibold">{leads.filter((lead) => lead.status === status).length}</p></div>)}</div>
    <div className="overflow-hidden rounded-xl border border-border bg-card"><div className="divide-y divide-border">{leads.length ? leads.map((lead) => <div key={lead.id} className="flex flex-wrap items-center gap-3 px-5 py-4"><div className="flex size-9 items-center justify-center rounded-full bg-accent text-primary"><UserRound className="size-4" /></div><div className="min-w-40 flex-1"><p className="text-sm font-medium">{lead.firstName} {lead.lastName || ''}</p><p className="text-xs text-muted-foreground">{lead.company || lead.email || 'No company details'}</p></div><span className="rounded bg-accent px-2 py-1 font-mono text-[10px] text-primary">{lead.status}</span><select aria-label={`Update ${lead.firstName} status`} value={lead.status} onChange={async (event) => { const status = event.target.value as typeof statuses[number]; await updateLeadStatus(lead.id, status); setLeads((items) => items.map((item) => item.id === lead.id ? { ...item, status } : item)) }} className="rounded border border-border bg-background px-2 py-1 text-xs"><option value="new">new</option><option value="contacted">contacted</option><option value="qualified">qualified</option><option value="proposal">proposal</option><option value="won">won</option><option value="lost">lost</option></select></div>) : <div className="p-8 text-center text-sm text-muted-foreground">No leads yet. Add your first revenue opportunity.</div>}</div></div>
    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"><form action={submit} className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6 shadow-2xl"><div className="flex items-center justify-between"><h3 className="font-semibold">Add lead</h3><button type="button" aria-label="Close" onClick={() => setOpen(false)}><X className="size-4" /></button></div>{error && <p className="text-xs text-destructive">{error}</p>}<div className="grid grid-cols-2 gap-3"><input name="firstName" required placeholder="First name" className="rounded-md border border-border bg-background px-3 py-2 text-sm" /><input name="lastName" placeholder="Last name" className="rounded-md border border-border bg-background px-3 py-2 text-sm" /></div><input name="email" type="email" placeholder="Email" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" /><input name="company" placeholder="Company" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" /><input name="valueCents" type="number" min="0" placeholder="Opportunity value" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" /><button disabled={saving} className="w-full rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground">{saving ? 'Saving…' : 'Create lead'}</button></form></div>}
  </section>
}
