import { getAnalytics, type AnalyticsFilters } from '@/app/actions/analytics'
import { listLeads } from '@/app/actions/leads'

export type AgentContext = { organizationId: string; userId: string; requestId: string }
export type AgentTool = { permission: 'READ'; description: string; execute: (context: AgentContext, filters?: AnalyticsFilters) => Promise<unknown> }

async function analytics(context: AgentContext, filters?: AnalyticsFilters) {
  return getAnalytics(filters)
}

export const readTools: Record<string, AgentTool> = {
  getBusinessOverview: { permission: 'READ', description: 'Organization-level business and marketing overview', execute: analytics },
  getLeadMetrics: { permission: 'READ', description: 'Lead counts, conversions, and revenue', execute: analytics },
  getCampaignMetrics: { permission: 'READ', description: 'Campaign performance metrics', execute: analytics },
  getMarketingMetrics: { permission: 'READ', description: 'Marketing spend and efficiency metrics', execute: analytics },
  getROIMetrics: { permission: 'READ', description: 'ROI, ROAS, CPL, and CAC metrics', execute: analytics },
  getChannelPerformance: { permission: 'READ', description: 'Internal campaign channel performance', execute: analytics },
  getRecentActivity: { permission: 'READ', description: 'Recent organization lead activity', execute: async () => listLeads() },
}

export async function runReadTools(context: AgentContext, filters?: AnalyticsFilters) {
  const result = await readTools.getMarketingMetrics.execute(context, filters)
  return { marketing: result }
}

export function toolRegistryPermissions() { return Object.fromEntries(Object.entries(readTools).map(([name, tool]) => [name, tool.permission])) }
