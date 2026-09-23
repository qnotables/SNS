'use client'

import { useState } from 'react'

export type InquiryNoteView = { id: string; note: string; createdAt: string }

type InquiryActionsProps = {
  inquiryId: string
  notes: InquiryNoteView[]
}

export function InquiryActions({ inquiryId, notes: initialNotes }: InquiryActionsProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function addNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!note.trim()) return
    setBusy(true)
    setError('')
    const response = await fetch('/api/admin/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inquiryId, note }) })
    const data = (await response.json().catch(() => ({}))) as { note?: InquiryNoteView; error?: string }
    setBusy(false)
    if (!response.ok || !data.note) { setError(data.error || 'Could not save note.'); return }
    setNotes((current) => [{ ...data.note!, createdAt: new Date(data.note!.createdAt).toLocaleString() }, ...current])
    setNote('')
  }

  async function deleteInquiry() {
    if (!window.confirm('Permanently delete this inquiry, its replies, and private notes?')) return
    setBusy(true)
    setError('')
    const response = await fetch(`/api/admin/inquiries?inquiryId=${encodeURIComponent(inquiryId)}`, { method: 'DELETE' })
    const data = (await response.json().catch(() => ({}))) as { error?: string }
    if (!response.ok) { setBusy(false); setError(data.error || 'Could not delete inquiry.'); return }
    window.location.reload()
  }

  return <div className="min-w-[260px] space-y-3">
    <div className="space-y-2">{notes.map((item) => <div key={item.id} className="border-l-2 border-olive/50 pl-2 text-xs"><p className="whitespace-pre-wrap text-charcoal/80">{item.note}</p><p className="mt-1 text-charcoal/50">{item.createdAt}</p></div>)}</div>
    <form onSubmit={addNote} className="space-y-2"><label className="block text-xs font-semibold text-navy">Private note<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} className="mt-1 w-full border border-navy/20 bg-cream px-2 py-2 text-sm text-charcoal outline-none focus:border-navy" placeholder="Add an internal note" /></label><button type="submit" disabled={busy || !note.trim()} className="border border-navy/20 px-3 py-2 text-xs font-semibold text-navy disabled:opacity-50">Save note</button></form>
    {error && <p role="alert" className="text-xs text-[#a64f43]">{error}</p>}
    <button type="button" onClick={deleteInquiry} disabled={busy} className="border border-[#a64f43]/40 px-3 py-2 text-xs font-semibold text-[#a64f43] disabled:opacity-50">Delete permanently</button>
  </div>
}
