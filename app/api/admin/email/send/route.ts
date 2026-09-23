import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { outboundEmails } from '@/lib/db/schema'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function emailsFrom(value: unknown) {
  return String(value ?? '')
    .split(/[\s,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || !isAdmin(session.user.email)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const from = String(body.from ?? '').trim()
  const to = emailsFrom(body.to)
  const cc = emailsFrom(body.cc)
  const subject = String(body.subject ?? '').trim()
  const textBody = String(body.textBody ?? '').trim()
  const htmlBody = String(body.htmlBody ?? '').trim()
  const domain = process.env.RESEND_EMAIL_DOMAIN?.trim().toLowerCase()

  if (!from || !emailPattern.test(from) || !domain || from.toLowerCase().split('@')[1] !== domain) return NextResponse.json({ error: `From must use a verified @${domain || 'sending'} domain.` }, { status: 400 })
  if (!to.length || to.some((email) => !emailPattern.test(email)) || cc.some((email) => !emailPattern.test(email))) return NextResponse.json({ error: 'Enter valid To and CC email addresses.' }, { status: 400 })
  if (!subject || subject.length > 200) return NextResponse.json({ error: 'Subject is required and must be 200 characters or fewer.' }, { status: 400 })
  if (!textBody && !htmlBody) return NextResponse.json({ error: 'Add a text or HTML body.' }, { status: 400 })
  if (htmlBody.length > 500_000 || textBody.length > 100_000) return NextResponse.json({ error: 'The email body is too large.' }, { status: 400 })

  const id = randomUUID()
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 })

  const resend = new Resend(apiKey)
  const emailPayload = htmlBody
    ? { from, to, ...(cc.length ? { cc } : {}), subject, html: htmlBody, ...(textBody ? { text: textBody } : {}) }
    : { from, to, ...(cc.length ? { cc } : {}), subject, text: textBody }
  const result = await resend.emails.send(emailPayload, { idempotencyKey: `admin-email/${id}` })

  if (result.error) {
    console.error('[v0] Resend email send failed:', result.error)
    await db.insert(outboundEmails).values({ id, fromEmail: from, toEmails: to.join(', '), ccEmails: cc.length ? cc.join(', ') : null, subject, textBody: textBody || null, htmlBody: htmlBody || null, status: 'failed', errorMessage: result.error.message })
    const statusCode = typeof result.error.statusCode === 'number' ? result.error.statusCode : undefined
    return NextResponse.json(
      { success: false, error: result.error.message, ...(statusCode === undefined ? {} : { statusCode }) },
      { status: 502 },
    )
  }

  await db.insert(outboundEmails).values({ id, resendId: result.data?.id, fromEmail: from, toEmails: to.join(', '), ccEmails: cc.length ? cc.join(', ') : null, subject, textBody: textBody || null, htmlBody: htmlBody || null, status: 'sent' })
  return NextResponse.json({ ok: true, id })
}
