import { z } from 'zod'

export const agentResponseSchema = z.object({
  summary: z.string(), insights: z.array(z.string()).default([]), recommendations: z.array(z.string()).default([]), metrics: z.record(z.string(), z.union([z.string(), z.number(), z.null()])).default({}), suggestedActions: z.array(z.string()).default([]), warnings: z.array(z.string()).default([]),
})
export type AgentResponse = z.infer<typeof agentResponseSchema>
export const emptyAgentResponse = (warning: string): AgentResponse => ({ summary: 'Nexora AI could not complete this analysis.', insights: [], recommendations: [], metrics: {}, suggestedActions: [], warnings: [warning] })
