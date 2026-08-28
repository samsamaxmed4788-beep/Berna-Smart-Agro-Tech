'use client'

import { useState } from 'react'
import { LeadsPanel } from '@/components/leads-panel'
import { MarketingPanel } from '@/components/marketing-panel'
import { AboutPanel } from '@/components/about-panel'
import {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  ChevronDown,
  Code2,
  FileCode2,
  Folder,
  GitBranch,
  LayoutDashboard,
  Megaphone,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Marketing', icon: Megaphone },
  { label: 'Content', icon: Boxes },
  { label: 'Leads & CRM', icon: Users },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'About Us', icon: Sparkles },
]

const files = ['README.md', 'nexora.config.ts', 'growth-plan.md', 'agent.ts']

type WorkspaceLead = { id: string; firstName: string; lastName: string | null; email: string | null; company: string | null; status: string; score: number; valueCents: number }

export function NexoraWorkspace({ initialLeads = [] }: { initialLeads?: WorkspaceLead[] }) {
  const [activeNav, setActiveNav] = useState('Overview')
  const [activeFile, setActiveFile] = useState('README.md')
  const [showEditor, setShowEditor] = useState(true)
  const [ranAgent, setRanAgent] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex w-full flex-col border-b border-border bg-sidebar lg:w-64 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-4" /></div>
              <div><p className="text-sm font-semibold tracking-tight">Nexora One</p><p className="font-mono text-[10px] text-muted-foreground">OS / workspace</p></div>
            </div>
            <button aria-label="Workspace settings" className="text-muted-foreground transition-colors hover:text-foreground"><Settings2 className="size-4" /></button>
          </div>
          <div className="flex-1 p-3">
            <div className="mb-5 rounded-lg border border-border bg-card/60 p-3"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workspace</span><ChevronDown className="size-3 text-muted-foreground" /></div><p className="mt-2 text-sm font-medium">Acme Growth Team</p><p className="mt-1 text-xs text-muted-foreground">Pro plan · 8 members</p></div>
            <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Operate</p>
            <nav className="space-y-1" aria-label="Primary navigation">{navItems.map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => setActiveNav(item.label)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${activeNav === item.label ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}><Icon className="size-4" />{item.label}{item.label === 'Analytics' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}</button> })}</nav>
            <p className="mb-2 mt-7 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Intelligence</p>
            <button onClick={() => setActiveNav('Nexora AI')} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${activeNav === 'Nexora AI' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}><Bot className="size-4" />Nexora AI<span className="ml-auto rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[9px] text-primary">BETA</span></button>
          </div>
          <div className="border-t border-border p-4"><div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-full bg-accent font-mono text-xs text-primary">AM</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">Amina Mohamed</p><p className="truncate text-[11px] text-muted-foreground">Owner</p></div><MoreHorizontal className="size-4 text-muted-foreground" /></div></div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 lg:px-8"><div><div className="flex items-center gap-2 text-xs text-muted-foreground"><span>Workspace</span><span>/</span><span className="text-foreground">{activeNav}</span></div><h1 className="mt-1 text-xl font-semibold tracking-tight">Good morning, Amina.</h1></div><div className="flex items-center gap-2"><button aria-label="Search" className="rounded-md border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground"><Search className="size-4" /></button><button className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-accent sm:flex"><GitBranch className="size-3.5" />main<ChevronDown className="size-3" /></button><button className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"><Plus className="size-3.5" />New workspace action</button></div></header>

          <div className="grid gap-6 p-5 lg:p-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0 space-y-6">
              {activeNav === 'About Us' && <AboutPanel />}
              {activeNav !== 'About Us' && <>
              {activeNav === 'Leads & CRM' && <LeadsPanel initialLeads={initialLeads} />}
              {activeNav === 'Marketing' && <MarketingPanel />}
              <div className="grid gap-3 sm:grid-cols-3"><Metric label="Pipeline value" value="$184.2k" trend="+18.4%" /><Metric label="Qualified leads" value="248" trend="+12.8%" /><Metric label="Marketing ROI" value="3.8x" trend="+0.6x" /></div>
              <div className="rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Command center</p><h2 className="mt-1 text-sm font-semibold">Business momentum</h2></div><button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></button></div><div className="p-5"><div className="flex h-48 items-end gap-2 sm:gap-3">{[35,48,42,67,58,76,71,88,82,96,90,100].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className="relative w-full rounded-sm bg-primary/15 transition-colors group-hover:bg-primary/35" style={{ height: `${height}%` }}><div className="absolute inset-x-0 bottom-0 rounded-sm bg-primary" style={{ height: `${Math.max(12, height - 24)}%` }} /></div><span className="font-mono text-[9px] text-muted-foreground">{['J','F','M','A','M','J','J','A','S','O','N','D'][index]}</span></div>)}</div><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted-foreground"><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-primary" />Revenue influenced</span><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-primary/20" />Opportunity volume</span></div></div></div>
              <div className="rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Activity stream</p><h2 className="mt-1 text-sm font-semibold">Latest signals</h2></div><button className="text-xs text-primary hover:underline">View all</button></div><div className="divide-y divide-border">{[['Campaign reached 12.4k people','Marketing','8 min ago'],['New high-intent lead: Farah Labs','CRM','42 min ago'],['Content brief ready for review','Content','2 hr ago']].map(([title, tag, time]) => <div key={title} className="flex items-center gap-3 px-5 py-4"><div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent">{tag === 'CRM' ? <Users className="size-3.5 text-primary" /> : tag === 'Content' ? <FileCode2 className="size-3.5 text-primary" /> : <Activity className="size-3.5 text-primary" />}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{title}</p><p className="mt-1 text-[11px] text-muted-foreground">{tag} · {time}</p></div><ChevronDown className="size-3 -rotate-90 text-muted-foreground" /></div>)}</div></div>
              </>}
            </div>

            <div className={activeNav === 'About Us' ? 'hidden' : 'space-y-6'}><div className="rounded-xl border border-primary/25 bg-primary/[0.04] p-5"><div className="flex items-center gap-2"><div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground"><Bot className="size-4" /></div><p className="text-sm font-semibold">Nexora AI</p><span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-primary"><span className="size-1.5 rounded-full bg-primary" />READY</span></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Your business copilot is ready to turn signals into decisions.</p><button onClick={() => setRanAgent(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"><Zap className="size-3.5" />{ranAgent ? 'Analysis queued' : 'Run growth analysis'}</button></div>
              <div className="rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Developer workspace</p><h2 className="mt-1 text-sm font-semibold">Nexora Studio</h2></div><button onClick={() => setShowEditor(!showEditor)} aria-label="Toggle editor" className="text-muted-foreground hover:text-foreground">{showEditor ? <X className="size-4" /> : <Code2 className="size-4" />}</button></div>{showEditor && <><div className="flex items-center gap-2 overflow-x-auto border-b border-border px-3 py-2">{files.map((file) => <button key={file} onClick={() => setActiveFile(file)} className={`flex shrink-0 items-center gap-1.5 rounded px-2 py-1.5 font-mono text-[10px] ${activeFile === file ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}><FileCode2 className="size-3" />{file}</button>)}</div><div className="bg-[#101719] p-4 font-mono text-[11px] leading-6 text-[#b3c6c4]"><div className="mb-3 flex items-center justify-between text-[10px] text-[#718985]"><span>~/nexora/{activeFile}</span><button onClick={() => setRanAgent(!ranAgent)} className="flex items-center gap-1 text-primary hover:text-primary/80"><Play className="size-3" />Run</button></div><p><span className="text-[#6e9d97]">01</span>  <span className="text-[#8ec9b8]">import</span> {'{'} intelligence {'}'} <span className="text-[#8ec9b8]">from</span> <span className="text-[#c1a887]">&apos;@nexora/core&apos;</span></p><p><span className="text-[#6e9d97]">02</span></p><p><span className="text-[#6e9d97]">03</span>  <span className="text-[#8ec9b8]">export const</span> workspace = {'{'}</p><p><span className="text-[#6e9d97]">04</span>    mode: <span className="text-[#c1a887]">&apos;growth&apos;</span>,</p><p><span className="text-[#6e9d97]">05</span>    signals: [<span className="text-[#c1a887]">&apos;pipeline&apos;</span>, <span className="text-[#c1a887]">&apos;content&apos;</span>],</p><p><span className="text-[#6e9d97]">06</span>    agent: <span className="text-[#8ec9b8]">true</span>,</p><p><span className="text-[#6e9d97]">07</span>  {'}'}</p></div></>}</div>
              <div className="rounded-xl border border-border bg-card p-5"><div className="flex items-center gap-3"><Folder className="size-4 text-primary" /><div><p className="text-xs font-semibold">Quick start</p><p className="mt-1 text-[11px] text-muted-foreground">Connect your first data source to unlock live insights.</p></div></div><button className="mt-4 flex items-center gap-2 text-xs font-medium text-primary hover:underline"><Plus className="size-3.5" />Connect data source</button></div></div>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) { return <div className="rounded-xl border border-border bg-card p-4"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p><div className="mt-3 flex items-end justify-between gap-2"><p className="text-2xl font-semibold tracking-tight">{value}</p><span className="mb-1 font-mono text-[10px] text-primary">{trend}</span></div><div className="mt-3 h-1 rounded-full bg-accent"><div className="h-full w-3/4 rounded-full bg-primary" /></div></div> }

export default NexoraWorkspace
