'use client'

import { useState } from 'react'
import { getAnalytics } from '@/app/actions/analytics'

type Data = Awaited<ReturnType<typeof getAnalytics>>
const money = (cents: number | null) => cents == null ? 'No data available yet' : `$${(cents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
const percent = (value: number | null) => value == null ? 'No data available yet' : `${value.toFixed(1)}%`

export function AnalyticsPanel({ initialData }: { initialData: Data }) {
  const [data, setData] = useState(initialData)
  const [period, setPeriod] = useState('30d')
  const [loading, setLoading] = useState(false)
  async function changePeriod(value: string) { setPeriod(value); setLoading(true); try { setData(await getAnalytics({ period: value })) } finally { setLoading(false) } }
  const { totals } = data
  return <section className="space-y-6" aria-labelledby="analytics-title">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Performance intelligence</p><h2 id="analytics-title" className="mt-1 text-2xl font-semibold tracking-tight">Marketing analytics</h2><p className="mt-1 text-sm text-muted-foreground">Real results from persisted campaign, channel, and lead records.</p></div><select value={period} onChange={e => changePeriod(e.target.value)} disabled={loading} className="rounded-md border border-border bg-card px-3 py-2 text-sm"><option value="today">Today</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="90d">Last 90 days</option></select></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Kpi label="Marketing spend" value={money(totals.spendCents)} /><Kpi label="Leads" value={String(totals.leads)} /><Kpi label="Conversion rate" value={percent(totals.conversionRate)} /><Kpi label="ROI" value={percent(totals.roi)} /></div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]"><div className="rounded-xl border border-border bg-card"><div className="border-b border-border px-5 py-4"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Campaign performance</p><h3 className="mt-1 text-sm font-semibold">Attributed performance</h3></div>{data.campaigns.length ? <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-xs"><thead className="text-muted-foreground"><tr className="border-b border-border"><th className="px-5 py-3 font-medium">Campaign</th><th className="px-3 py-3 font-medium">Spend</th><th className="px-3 py-3 font-medium">Leads</th><th className="px-3 py-3 font-medium">Conv.</th><th className="px-3 py-3 font-medium">CPL</th><th className="px-5 py-3 font-medium">ROI</th></tr></thead><tbody>{data.campaigns.map(row => <tr key={row.id} className="border-b border-border last:border-0"><td className="px-5 py-4 font-medium">{row.name}</td><td className="px-3 py-4">{money(row.spendCents)}</td><td className="px-3 py-4">{row.leads}</td><td className="px-3 py-4">{row.conversions}</td><td className="px-3 py-4">{money(row.cplCents)}</td><td className="px-5 py-4">{percent(row.roi)}</td></tr>)}</tbody></table></div> : <Empty />}</div><div className="rounded-xl border border-border bg-card"><div className="border-b border-border px-5 py-4"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Channel reporting</p><h3 className="mt-1 text-sm font-semibold">Internal campaign channels</h3></div>{data.channels.length ? <div className="divide-y divide-border">{data.channels.map(row => <div key={row.channel} className="flex items-center justify-between gap-3 px-5 py-4"><div><p className="text-sm font-medium">{row.channel}</p><p className="mt-1 text-xs text-muted-foreground">{row.leads} leads · {row.conversions} conversions</p></div><div className="text-right"><p className="text-sm font-medium">{money(row.spendCents)}</p><p className="mt-1 text-xs text-muted-foreground">{percent(row.roi)} ROI</p></div></div>)}</div> : <Empty />}</div></div>
  </section>
}
function Kpi({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-border bg-card p-4"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p></div> }
function Empty() { return <div className="p-8 text-center text-sm text-muted-foreground">No data available yet</div> }
