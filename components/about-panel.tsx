'use client'

import { ArrowUpRight, BrainCircuit, MessageCircle, Phone, Target, Workflow } from 'lucide-react'

const capabilities = [
  {
    icon: Workflow,
    title: 'Automated CRM',
    description: 'Keep every relationship, handoff, and next step moving in one intelligent workspace.',
  },
  {
    icon: Target,
    title: 'Sales pipeline',
    description: 'Turn scattered opportunities into a focused pipeline your team can act on with confidence.',
  },
  {
    icon: BrainCircuit,
    title: 'AI marketing tools',
    description: 'Transform business signals into sharper campaigns, content, and decisions without the busywork.',
  },
]

export function AboutPanel() {
  return (
    <section aria-labelledby="about-heading" className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card/80 p-5 shadow-2xl shadow-primary/[0.04] backdrop-blur-xl sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-primary/[0.035]" />
      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-5 border-b border-border pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> About Nexora One
            </div>
            <h2 id="about-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">The operating system for ambitious growth.</h2>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">Nexora One empowers businesses with automated CRM, intelligent sales pipelines, and AI-powered marketing tools — so every decision is clearer, faster, and built for momentum.</p>
          </div>
          <div className="rounded-xl border border-border bg-background/60 p-4 lg:max-w-xs">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Our vision</p>
            <p className="mt-2 text-sm leading-6 text-foreground">Make sophisticated growth infrastructure feel simple, connected, and human.</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-xl border border-border bg-background/45 p-4 transition-colors hover:border-primary/35 hover:bg-primary/[0.06]">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></div>
              <h3 className="mt-4 text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Let&apos;s build what&apos;s next</p>
            <p className="mt-2 text-sm text-muted-foreground">Talk to the Nexora One team about your growth system.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="tel:+252634482134" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"><Phone className="size-3.5" /> Call +252 63 4482134</a>
            <a href="https://wa.me/252634482134" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"><MessageCircle className="size-3.5" /> WhatsApp <ArrowUpRight className="size-3" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPanel
