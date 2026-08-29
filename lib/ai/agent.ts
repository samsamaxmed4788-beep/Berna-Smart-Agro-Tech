import { randomUUID } from 'node:crypto'
import { requireOrganizationContext } from '@/lib/authorization'
import { generateAgentResponse } from './provider'
import { runReadTools, type AgentContext } from './tools'

export async function runNexoraAgent(request: string) {
  const auth = await requireOrganizationContext('member')
  const context: AgentContext = { organizationId: auth.organizationId, userId: auth.userId, requestId: randomUUID() }
  const started = Date.now()
  const toolContext = await runReadTools(context, { period: '30d' })
  console.info('[nexora-ai]', { requestId: context.requestId, organizationId: context.organizationId, tool: 'getMarketingMetrics', success: true, latencyMs: Date.now() - started })
  const response = await generateAgentResponse(request.trim(), toolContext)
  return { requestId: context.requestId, organizationId: context.organizationId, response }
}
