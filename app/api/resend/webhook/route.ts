import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { db } from '@/lib/db'
import { receivedEmails } from '@/lib/db/schema'

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 500 })

  const payload = await request.text()
  let event: Awaited<ReturnType<Resend['webhooks']['verify']>>
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get('svix-id') || '',
        timestamp: request.headers.get('svix-timestamp') || '',
        signature: request.headers.get('svix-signature') || '',
      },
      webhookSecret: secret,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 })
  }

  if (event.type !== 'email.received') return NextResponse.json({ ok: true })

  const resend = new Resend(process.env.RESEND_API_KEY)
  const received = await resend.emails.receiving.get(event.data.email_id)
  if (received.error || !received.data) return NextResponse.json({ error: 'Could not retrieve received email.' }, { status: 502 })

  const email = received.data
  await db.insert(receivedEmails).values({ id: randomUUID(), resendId: email.id, fromEmail: email.from, toEmails: email.to.join(', '), ccEmails: email.cc?.join(', ') || null, subject: email.subject || '(no subject)', textBody: email.text, htmlBody: email.html, messageId: email.message_id }).onConflictDoNothing({ target: receivedEmails.resendId })

  return NextResponse.json({ ok: true })
}
