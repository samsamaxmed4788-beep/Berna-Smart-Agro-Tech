import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { and, asc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { conversationMessages, conversations } from '@/lib/db/schema'
import { requireOrganizationContext } from '@/lib/authorization'
import { runNexoraAgent } from '@/lib/ai/agent'

export async function POST(request: Request) {
  try {
    const auth = await requireOrganizationContext('member')
    const body = await request.json() as { message?: string; conversationId?: string }
    const message = body.message?.trim()
    if (!message || message.length > 4000) return NextResponse.json({ error: 'Message must be between 1 and 4000 characters.' }, { status: 400 })
    let conversationId = body.conversationId
    if (conversationId) {
      const existing = await db.select({ id: conversations.id }).from(conversations).where(and(eq(conversations.id, conversationId), eq(conversations.organizationId, auth.organizationId), eq(conversations.userId, auth.userId))).limit(1)
      if (!existing[0]) return NextResponse.json({ error: 'Conversation not found.' }, { status: 404 })
    } else {
      conversationId = randomUUID()
      await db.insert(conversations).values({ id: conversationId, organizationId: auth.organizationId, userId: auth.userId, title: message.slice(0, 80) })
    }
    await db.insert(conversationMessages).values({ id: randomUUID(), organizationId: auth.organizationId, conversationId, userId: auth.userId, role: 'user', content: message })
    const result = await runNexoraAgent(message)
    await db.insert(conversationMessages).values({ id: randomUUID(), organizationId: auth.organizationId, conversationId, userId: auth.userId, role: 'assistant', content: result.response.summary, responseJson: result.response })
    return NextResponse.json({ conversationId, ...result.response })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to process request.'
    const status = message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ error: status === 401 ? 'Authentication required.' : 'Unable to process request.' }, { status })
  }
}

export async function GET() {
  try {
    const auth = await requireOrganizationContext('member')
    const rows = await db.select().from(conversations).where(and(eq(conversations.organizationId, auth.organizationId), eq(conversations.userId, auth.userId))).orderBy(asc(conversations.updatedAt))
    return NextResponse.json({ conversations: rows })
  } catch { return NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) }
}
