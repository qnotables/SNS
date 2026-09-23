'use client'

import { FormEvent, useState } from 'react'

export function EmailComposer({ defaultFrom }: { defaultFrom: string }) {
  const [status, setStatus] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setStatus(null)
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/admin/email/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form.entries())) })
    const result = (await response.json()) as { error?: string }
    setSending(false)
    if (!response.ok) {
      setStatus(result.error || 'Message could not be sent.')
      return
    }
    event.currentTarget.reset()
    setStatus('Message sent successfully.')
  }

  return (
    <form onSubmit={submit} className="grid gap-5 border border-navy/15 bg-cream p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">From<input className="field-control" name="from" type="email" defaultValue={defaultFrom} required /></label>
        <label className="field-label">To<input className="field-control" name="to" type="text" placeholder="person@example.com, team@example.com" required /></label>
        <label className="field-label">CC <span className="font-normal normal-case tracking-normal text-charcoal/50">optional</span><input className="field-control" name="cc" type="text" placeholder="copy@example.com" /></label>
        <label className="field-label">Subject<input className="field-control" name="subject" type="text" required /></label>
      </div>
      <label className="field-label">Plain-text body <span className="font-normal normal-case tracking-normal text-charcoal/50">recommended fallback</span><textarea className="field-control min-h-36" name="textBody" placeholder="Write your message here..." /></label>
      <label className="field-label">HTML body <span className="font-normal normal-case tracking-normal text-charcoal/50">optional</span><textarea className="field-control min-h-48 font-mono text-xs" name="htmlBody" placeholder="<p>Hello...</p>" /></label>
      {status ? <p role="status" className={status.includes('successfully') ? 'border border-olive/30 bg-olive/10 p-3 text-sm text-navy' : 'border border-red/30 bg-red/10 p-3 text-sm text-red'}>{status}</p> : null}
      <button className="w-fit bg-navy px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-60" disabled={sending}>{sending ? 'Sending...' : 'Send email'}</button>
    </form>
  )
}
