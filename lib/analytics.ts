export type AnalyticsRow = { spendCents: number; leads: number; conversions: number; revenueCents: number }

export function calculateMetrics(row: AnalyticsRow) {
  const spendCents = Math.max(0, Number(row.spendCents) || 0)
  const leads = Math.max(0, Number(row.leads) || 0)
  const conversions = Math.max(0, Number(row.conversions) || 0)
  const revenueCents = Math.max(0, Number(row.revenueCents) || 0)
  return {
    spendCents, leads, conversions, revenueCents,
    conversionRate: leads ? (conversions / leads) * 100 : null,
    cplCents: leads ? spendCents / leads : null,
    cacCents: conversions ? spendCents / conversions : null,
    roas: spendCents ? revenueCents / spendCents : null,
    roi: spendCents ? ((revenueCents - spendCents) / spendCents) * 100 : null,
  }
}

export function dateBounds(period: string, from?: string, to?: string) {
  const end = to && /^\d{4}-\d{2}-\d{2}$/.test(to) ? new Date(`${to}T23:59:59.999Z`) : new Date()
  const start = from && /^\d{4}-\d{2}-\d{2}$/.test(from) ? new Date(`${from}T00:00:00.000Z`) : new Date(end)
  if (!from) start.setUTCDate(start.getUTCDate() - ({ today: 0, '7d': 6, '30d': 29, '90d': 89 }[period] ?? 29))
  return { start, end }
}
