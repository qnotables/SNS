import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { inquiryReplies, inquiries } from '@/lib/db/schema'

const MAX_SUBJECT_LENGTH = 200
const MAX_MESSAGE_LENGTH = 12000

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const inquiryId = clean(body.inquiryId, 100)
  const subject = clean(body.subject, MAX_SUBJECT_LENGTH)
  const message = clean(body.message, MAX_MESSAGE_LENGTH)
  if (!inquiryId || !subject || !message) {
    return NextResponse.json({ error: 'Inquiry, subject, and message are required.' }, { status: 400 })
  }

  const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, inquiryId)).limit(1)
  if (!inquiry?.email) {
    return NextResponse.json({ error: 'This inquiry does not have a reply email address.' }, { status: 400 })
  }

  const replyId = randomUUID()
  const apiKey = process.env.RESEND_API_KEY
  const domain = process.env.RESEND_EMAIL_DOMAIN
  if (!apiKey || !domain) {
    await db.insert(inquiryReplies).values({ id: replyId, inquiryId, recipientEmail: inquiry.email, subject, message, status: 'failed', errorMessage: 'Email service is not configured.' })
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 })
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send(
    {
      from: `Shepherds Not Sheep <contact@${domain}>`,
      to: [inquiry.email],
      subject,
      text: message,
      html: `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#172936;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>`,
    },
    { idempotencyKey: `inquiry-reply/${replyId}` },
  )

  await db.insert(inquiryReplies).values({
    id: replyId,
    inquiryId,
    recipientEmail: inquiry.email,
    subject,
    message,
    status: error ? 'failed' : 'sent',
    resendId: data?.id ?? null,
    errorMessage: error?.message ?? null,
  })

  if (error) {
    console.error('[v0] Inquiry reply failed:', error.message)
    return NextResponse.json({ error: 'The reply could not be sent. Check the email service configuration.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}
