import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type InquiryType = 'assistance' | 'involve' | 'contact'

type FieldRow = { label: string; value: string }

const MAX_FIELD_LENGTH = 4000

function clean(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, MAX_FIELD_LENGTH)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function buildRows(type: InquiryType, body: Record<string, unknown>): { rows: FieldRow[]; error?: string; replyTo?: string } {
  const name = clean(body.name)
  const email = clean(body.email)
  const phone = clean(body.phone)
  const city = clean(body.city)
  const message = clean(body.message)

  if (email && !isEmail(email)) return { rows: [], error: 'Please enter a valid email address.' }

  if (type === 'assistance') {
    const need = clean(body.need)
    const heardFrom = clean(body.heardFrom)
    if (!need) return { rows: [], error: 'Please choose the kind of help you need most right now.' }
    if (!email && !phone) return { rows: [], error: 'Please share a phone number or an email so we can reach you.' }
    if (!message) return { rows: [], error: 'Please add a short description so we understand your situation.' }
    return {
      rows: [
        { label: 'Most urgent need', value: need },
        { label: 'Name', value: name || 'Not provided' },
        { label: 'City / region', value: city || 'Not provided' },
        { label: 'Phone', value: phone || 'Not provided' },
        { label: 'Email', value: email || 'Not provided' },
        { label: 'How they heard about us', value: heardFrom || 'Not provided' },
        { label: 'Description', value: message },
      ],
      replyTo: email || undefined,
    }
  }

  if (type === 'involve') {
    const role = clean(body.role)
    const skills = clean(body.skills)
    const availability = clean(body.availability)
    if (!role) return { rows: [], error: 'Please choose how you would like to get involved.' }
    if (!name) return { rows: [], error: 'Please share your name.' }
    if (!email || !isEmail(email)) return { rows: [], error: 'Please share a valid email so we can follow up.' }
    return {
      rows: [
        { label: 'Role', value: role },
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'City / region', value: city || 'Not provided' },
        { label: 'Skills', value: skills || 'Not provided' },
        { label: 'Hours / availability', value: availability || 'Not provided' },
        { label: 'Message', value: message || 'Not provided' },
      ],
      replyTo: email,
    }
  }

  const subject = clean(body.subject)
  if (!name) return { rows: [], error: 'Please share your name.' }
  if (!email || !isEmail(email)) return { rows: [], error: 'Please share a valid email so we can respond.' }
  if (!message) return { rows: [], error: 'Please add a message.' }
  return {
    rows: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone || 'Not provided' },
      { label: 'Subject', value: subject || 'General inquiry' },
      { label: 'Message', value: message },
    ],
    replyTo: email,
  }
}

const subjectByType: Record<InquiryType, string> = {
  assistance: 'New veteran assistance request',
  involve: 'New get involved inquiry',
  contact: 'New contact message',
}

export async function POST(request: Request) {
  const toEmail = process.env.CONTACT_TO_EMAIL
  const domain = process.env.RESEND_EMAIL_DOMAIN
  const apiKey = process.env.RESEND_API_KEY

  if (!toEmail || !domain || !apiKey) {
    return NextResponse.json(
      { error: 'Online submissions are not fully configured yet. Please use the contact email listed on this page.' },
      { status: 503 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const type = clean(body.type) as InquiryType
  if (type !== 'assistance' && type !== 'involve' && type !== 'contact') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: ignore anything that fills the hidden company field.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const { rows, error, replyTo } = buildRows(type, body)
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  const resend = new Resend(apiKey)
  const heading = subjectByType[type]
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#172936;line-height:1.6"><h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2><table style="border-collapse:collapse;width:100%">${rows
    .map(
      (row) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e1d8;background:#f4f0e8;font-weight:600;vertical-align:top;width:180px">${escapeHtml(row.label)}</td><td style="padding:8px 12px;border:1px solid #e5e1d8;white-space:pre-wrap">${escapeHtml(row.value)}</td></tr>`,
    )
    .join('')}</table><p style="margin-top:16px;color:#5b6670;font-size:13px">Submitted from the Shepherds Not Sheep website.</p></div>`
  const text = `${heading}\n\n${rows.map((row) => `${row.label}: ${row.value}`).join('\n')}\n\nSubmitted from the Shepherds Not Sheep website.`

  const { error: sendError } = await resend.emails.send({
    from: `Shepherds Not Sheep <notifications@${domain}>`,
    to: [toEmail],
    replyTo: replyTo,
    subject: heading,
    html,
    text,
  })

  if (sendError) {
    console.error('[v0] Resend send failed:', sendError.message)
    return NextResponse.json({ error: 'We could not send your message right now. Please try again shortly.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
