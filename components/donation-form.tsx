'use client'

import { useState, useTransition } from 'react'
import { createDonationCheckout } from '@/app/actions/donation'

const presets = [25, 50, 100, 250]

export function DonationForm({ success, canceled }: { success?: boolean; canceled?: boolean }) {
  const [type, setType] = useState<'one-time' | 'monthly'>('one-time')
  const [amount, setAmount] = useState('50')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = event.currentTarget
    const data = new FormData(form)
    data.set('amount', amount)
    data.set('donationType', type)
    startTransition(async () => {
      try {
        const url = await createDonationCheckout(data)
        if (!url) throw new Error('Checkout is unavailable right now. Please try again.')
        window.location.assign(url)
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'Unable to start checkout. Please try again.')
      }
    })
  }

  return <div className="border border-navy/15 bg-cream p-6 shadow-[0_16px_40px_rgba(23,41,54,0.08)] sm:p-8">
    {success && <div className="mb-6 border border-olive/30 bg-olive/10 p-4 text-sm leading-6 text-navy">Thank you. Your donation was received and will appear in our records after Stripe confirms payment.</div>}
    {canceled && <div className="mb-6 border border-red/25 bg-red/5 p-4 text-sm leading-6 text-navy">Checkout was canceled. No donation was recorded as complete.</div>}
    <div className="mb-7 grid grid-cols-2 border border-navy/15 p-1" role="tablist" aria-label="Donation frequency">
      {(['one-time', 'monthly'] as const).map((option) => <button key={option} type="button" role="tab" aria-selected={type === option} onClick={() => setType(option)} className={`px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${type === option ? 'bg-navy text-cream' : 'text-charcoal/60 hover:text-navy'}`}>{option === 'one-time' ? 'One time' : 'Monthly'}</button>)}
    </div>
    <form onSubmit={submit} className="space-y-6">
      <div><label htmlFor="amount" className="field-label">Amount in USD</label><div className="relative"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-charcoal/50">$</span><input id="amount" name="amount" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" className="field-control pl-9 text-xl" required /></div><div className="mt-3 flex flex-wrap gap-2">{presets.map((preset) => <button key={preset} type="button" onClick={() => setAmount(String(preset))} className={`border px-3 py-2 text-xs font-bold ${amount === String(preset) ? 'border-navy bg-navy text-cream' : 'border-navy/15 text-navy hover:border-navy/40'}`}>${preset}</button>)}</div></div>
      <div><label htmlFor="donor-name" className="field-label">Name</label><input id="donor-name" name="name" className="field-control" autoComplete="name" required /></div>
      <div><label htmlFor="donor-email" className="field-label">Email</label><input id="donor-email" name="email" type="email" className="field-control" autoComplete="email" required /></div>
      <div><label htmlFor="program" className="field-label">Direct my gift</label><select id="program" name="program" className="field-control"><option>Where needed most</option><option>Stability</option><option>Veteran advocacy</option><option>Education & employment</option><option>Entrepreneurship</option><option>Community & purpose</option></select></div>
      <p className="text-xs leading-5 text-charcoal/55">You will complete payment securely through Stripe. Shepherds Not Sheep does not see or store your full card details.</p>
      {error && <p role="alert" className="border border-red/30 bg-red/5 p-3 text-sm leading-6 text-red">{error}</p>}
      <button type="submit" disabled={isPending} className="w-full bg-navy px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-navy/90 disabled:cursor-wait disabled:opacity-60">{isPending ? 'Opening secure checkout…' : type === 'monthly' ? 'Continue to monthly donation' : 'Continue to donation'}</button>
    </form>
  </div>
}
