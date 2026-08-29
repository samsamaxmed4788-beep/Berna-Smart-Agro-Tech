'use client'

import { useState } from 'react'
import { Bot, Send, AlertTriangle } from 'lucide-react'

type AgentMessage = { role: 'user' | 'assistant'; content: string; insights?: string[]; recommendations?: string[]; metrics?: Record<string, string | number | null>; warnings?: string[] }

export function AIAgentPanel() {
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (!input.trim() || loading) return
    const content = input.trim(); setInput(''); setError(''); setMessages((current) => [...current, { role: 'user', content }]); setLoading(true)
    try { const response = await fetch('/api/agent/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: content }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Unable to process request.'); setMessages((current) => [...current, { role: 'assistant', content: data.summary, insights: data.insights, recommendations: data.recommendations, metrics: data.metrics, warnings: data.warnings }]) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to process request.') } finally { setLoading(false) }
  }
  return <section className="rounded-xl border border-border bg-card p-5"><div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><Bot className="size-4" /></div><div><p className="text-sm font-semibold">Nexora AI</p><p className="text-xs text-muted-foreground">Read-only business intelligence</p></div></div><div className="mt-5 min-h-48 space-y-3">{messages.length === 0 && <p className="text-sm leading-relaxed text-muted-foreground">Ask about leads, campaigns, spend, conversions, or ROI. Nexora AI only uses authorized workspace data.</p>}{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`rounded-lg p-3 text-sm ${message.role === 'user' ? 'ml-8 bg-accent' : 'mr-8 border border-border'}`}><p className="leading-relaxed">{message.content}</p>{message.insights?.length ? <div className="mt-3"><p className="font-mono text-[10px] uppercase tracking-wider text-primary">Insights</p><ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground">{message.insights.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}{message.recommendations?.length ? <div className="mt-3"><p className="font-mono text-[10px] uppercase tracking-wider text-primary">Recommendations</p><ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground">{message.recommendations.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}{message.warnings?.length ? <div className="mt-3 flex gap-2 text-xs text-muted-foreground"><AlertTriangle className="size-3.5 shrink-0 text-primary" />{message.warnings.join(' ')}</div> : null}</div>)}</div>{error && <p role="alert" className="mt-3 text-xs text-destructive">{error}</p>}<form onSubmit={submit} className="mt-4 flex gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} disabled={loading} placeholder="Ask Nexora AI..." aria-label="Message Nexora AI" className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /><button disabled={loading || !input.trim()} aria-label="Send message" className="rounded-md bg-primary px-3 text-primary-foreground disabled:opacity-50"><Send className="size-4" /></button></form></section>
}
