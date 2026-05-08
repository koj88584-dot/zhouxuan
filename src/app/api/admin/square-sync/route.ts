import { NextResponse } from 'next/server'
import { runSquareSync } from '@/lib/square'

function isAuthorized(request: Request) {
  const auth = request.headers.get('authorization')
  const token = request.headers.get('x-admin-token')
  const expected = process.env.ADMIN_API_TOKEN

  if (!expected) return false
  if (token === expected) return true
  if (auth === `Bearer ${expected}`) return true

  return false
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const summary = await runSquareSync()
  return NextResponse.json(summary)
}
