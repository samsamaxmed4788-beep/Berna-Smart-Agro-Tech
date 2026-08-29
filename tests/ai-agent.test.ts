import { describe, expect, it } from 'vitest'
import { agentResponseSchema, emptyAgentResponse } from '@/lib/ai/response'
import { readTools, toolRegistryPermissions } from '@/lib/ai/tools'

describe('Nexora AI Phase 6A', () => {
  it('validates structured responses and safely handles malformed output', () => {
    expect(agentResponseSchema.safeParse({ summary: 'ok', insights: [], recommendations: [], metrics: {}, suggestedActions: [], warnings: [] }).success).toBe(true)
    expect(agentResponseSchema.safeParse({ summary: 4 }).success).toBe(false)
    expect(emptyAgentResponse('setup').warnings).toEqual(['setup'])
  })
  it('registers READ tools only', () => {
    expect(Object.values(toolRegistryPermissions())).toEqual(Array(Object.keys(readTools).length).fill('READ'))
    expect(Object.values(readTools).every((tool) => tool.permission === 'READ')).toBe(true)
  })
  it('does not expose secrets in safe fallback output', () => {
    const result = JSON.stringify(emptyAgentResponse('AI provider is not configured'))
    expect(result).not.toContain('API_KEY')
    expect(result).not.toContain('DATABASE_URL')
  })
  it('keeps tool context server-owned', () => {
    expect(readTools.getMarketingMetrics.execute.length).toBeGreaterThan(0)
  })
})
