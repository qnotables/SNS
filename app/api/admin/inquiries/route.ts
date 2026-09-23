import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { inquiryNotes, inquiryReplies, inquiries } from '@/lib/db/schema'

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()
}

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user && isAdmin(session.user.email) ? session.user : null
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const inquiryId = typeof body.inquiryId === 'string' ? body.inquiryId.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 5000) : ''
  if (!inquiryId || !note) return NextResponse.json({ error: 'Inquiry and note are required.' }, { status: 400 })

  const [inquiry] = await db.select({ id: inquiries.id }).from(inquiries).where(eq(inquiries.id, inquiryId)).limit(1)
  if (!inquiry) return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 })

  const [created] = await db.insert(inquiryNotes).values({ id: randomUUID(), inquiryId, note }).returning()
  return NextResponse.json({ ok: true, note: created })
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const inquiryId = new URL(request.url).searchParams.get('inquiryId')?.trim()
  if (!inquiryId) return NextResponse.json({ error: 'Inquiry is required.' }, { status: 400 })

  const [inquiry] = await db.select({ id: inquiries.id }).from(inquiries).where(eq(inquiries.id, inquiryId)).limit(1)
  if (!inquiry) return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 })

  await db.transaction(async (tx) => {
    await tx.delete(inquiryNotes).where(eq(inquiryNotes.inquiryId, inquiryId))
    await tx.delete(inquiryReplies).where(eq(inquiryReplies.inquiryId, inquiryId))
    await tx.delete(inquiries).where(and(eq(inquiries.id, inquiryId)))
  })
  return NextResponse.json({ ok: true })
}
