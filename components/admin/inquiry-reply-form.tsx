'use client'

import { useState } from 'react'

type InquiryReplyFormProps = {
  inquiryId: string
  recipientEmail: string
  defaultSubject: string
}

export function InquiryReplyForm({ inquiryId, recipientEmail, defaultSubject }: InquiryReplyFormProps) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState(defaultSubject)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/admin/inquiries/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiryId, subject, message }),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) throw new Error(data.error || 'The reply could not be sent.')
      setStatus('sent')
      setMessage('')
    } catch (replyError) {
      setStatus('error')
      setError(replyError instanceof Error ? replyError.message : 'The reply could not be sent.')
    }
  }

  if (!open) {
    return <button type="button" onClick={() => setOpen(true)} className="border border-navy/20 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/5">Reply</button>
  }

  return (
    <div className="min-w-[280px] space-y-3 bg-[#f4f0e8] p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">One-off reply</p>
          <p className="mt-1 text-xs text-charcoal/65">To {recipientEmail}</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-charcoal/60 hover:text-navy">Close</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block text-xs font-semibold text-navy">Subject<input required value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-1 w-full border border-navy/20 bg-cream px-3 py-2 text-sm text-charcoal outline-none focus:border-navy" /></label>
        <label className="block text-xs font-semibold text-navy">Message<textarea required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} className="mt-1 w-full resize-y border border-navy/20 bg-cream px-3 py-2 text-sm text-charcoal outline-none focus:border-navy" /></label>
        {status === 'sent' && <p role="status" className="text-xs font-semibold text-olive">Reply sent.</p>}
        {status === 'error' && <p role="alert" className="text-xs text-[#a64f43]">{error}</p>}
        <button type="submit" disabled={status === 'sending'} className="bg-navy px-3 py-2 text-xs font-semibold text-cream disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send reply'}</button>
      </form>
    </div>
  )
}
