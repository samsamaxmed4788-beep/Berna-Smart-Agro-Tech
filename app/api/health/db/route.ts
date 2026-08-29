import { NextResponse } from 'next/server'
import { verifyDatabaseConnection } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const connected = await verifyDatabaseConnection()

    if (!connected) {
      return NextResponse.json({ status: 'error', database: 'unavailable' }, { status: 503 })
    }

    return NextResponse.json({ status: 'ok', database: 'connected' })
  } catch {
    return NextResponse.json({ status: 'error', database: 'unavailable' }, { status: 503 })
  }
}
