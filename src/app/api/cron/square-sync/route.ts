import { NextResponse } from 'next/server'
import { runSquareSync } from '@/lib/square'

export async function POST(request: Request) {
  if (!process.env.CRON_SECRET || request.headers.get('x-cron-secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const summary = await runSquareSync()
  return NextResponse.json(summary)
}
