'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const RESPONSE_LINE = 'We read messages within 2 business days.'

function useInquiry() {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState('')

  async function submit(payload: Record<string, string>) {
    setState('submitting')
    setError('')
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again shortly.')
        setState('error')
        return
      }
      setState('success')
    } catch {
      setError('We could not reach the server. Please check your connection and try again.')
      setState('error')
    }
  }

  return { state, error, submit }
}

function SuccessCard({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" className="flex gap-3 rounded-sm border border-olive/30 bg-olive/10 p-5 text-sm leading-7 text-navy">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-olive" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

function ErrorText({ error }: { error: string }) {
  if (!error) return null
  return (
    <p role="alert" className="rounded-sm border border-red/30 bg-red/10 px-4 py-3 text-sm font-medium text-red">
      {error}
    </p>
  )
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

const assistanceNeeds = ['Housing', 'Food', 'VA benefits', 'Employment', 'Education', 'Transport', 'Mentorship', 'Other']

export function AssistanceForm() {
  const { state, error, submit } = useInquiry()
  const [need, setNeed] = useState('')

  if (state === 'success') {
    return (
      <SuccessCard>
        <p className="font-semibold">We received this.</p>
        <p className="mt-1">{RESPONSE_LINE} If you are in crisis, use the numbers above now.</p>
      </SuccessCard>
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    submit({
      type: 'assistance',
      need,
      name: String(form.get('name') || ''),
      city: String(form.get('city') || ''),
      phone: String(form.get('phone') || ''),
      email: String(form.get('email') || ''),
      heardFrom: String(form.get('heardFrom') || ''),
      message: String(form.get('message') || ''),
      company: String(form.get('company') || ''),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Honeypot />
      <fieldset>
        <legend className="field-label mb-3">What do you need most right now?<span className="ml-1 text-red">*</span></legend>
        <div className="flex flex-wrap gap-2">
          {assistanceNeeds.map((option) => {
            const active = need === option
            return (
              <label
                key={option}
                className={`cursor-pointer rounded-sm border px-4 py-2.5 text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-olive/40 ${active ? 'border-navy bg-navy text-cream' : 'border-navy/20 bg-cream text-navy hover:border-navy/40'}`}
              >
                <input type="radio" name="need" value={option} checked={active} onChange={() => setNeed(option)} className="sr-only" />
                {option}
              </label>
            )
          })}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Name <span className="font-normal normal-case tracking-normal text-charcoal/40">(optional)</span><input name="name" className="field-control" autoComplete="name" /></label>
        <label className="field-label">City / region<input name="city" className="field-control" autoComplete="address-level2" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Phone<input type="tel" name="phone" className="field-control" autoComplete="tel" /></label>
        <label className="field-label">Email<input type="email" name="email" className="field-control" autoComplete="email" /></label>
      </div>
      <p className="-mt-2 text-xs leading-6 text-charcoal/55">Share at least one — a phone number or an email — so we can reach you.</p>
      <label className="field-label">Tell us a little more<span className="ml-1 text-red">*</span><textarea required name="message" className="field-control min-h-32 resize-y" placeholder="Share only what you feel comfortable sharing." /></label>
      <label className="field-label">How did you hear about us? <span className="font-normal normal-case tracking-normal text-charcoal/40">(optional)</span><input name="heardFrom" className="field-control" /></label>
      <ErrorText error={error} />
      <Button type="submit" disabled={state === 'submitting'} className="w-full bg-red text-cream hover:bg-red/90 sm:w-fit">
        {state === 'submitting' ? 'Sending…' : 'Send this to the team'}
      </Button>
    </form>
  )
}

const involveRoles = ['Volunteer', 'Mentor', 'Hire an intern', 'Donate gear', 'Sponsor', 'Refer a veteran', 'Other']

export function InvolveForm() {
  const { state, error, submit } = useInquiry()
  const [role, setRole] = useState('')

  if (state === 'success') {
    return (
      <SuccessCard>
        <p className="font-semibold">Thank you — we received this.</p>
        <p className="mt-1">{RESPONSE_LINE} We appreciate you helping build this.</p>
      </SuccessCard>
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    submit({
      type: 'involve',
      role,
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      city: String(form.get('city') || ''),
      skills: String(form.get('skills') || ''),
      availability: String(form.get('availability') || ''),
      message: String(form.get('message') || ''),
      company: String(form.get('company') || ''),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Honeypot />
      <label className="field-label">How would you like to get involved?<span className="ml-1 text-red">*</span>
        <select required name="roleSelect" value={role} onChange={(event) => setRole(event.target.value)} className="field-control">
          <option value="" disabled>Choose one…</option>
          {involveRoles.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Name<span className="ml-1 text-red">*</span><input required name="name" className="field-control" autoComplete="name" /></label>
        <label className="field-label">Email<span className="ml-1 text-red">*</span><input required type="email" name="email" className="field-control" autoComplete="email" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">City / region<input name="city" className="field-control" autoComplete="address-level2" /></label>
        <label className="field-label">Hours / availability<input name="availability" className="field-control" placeholder="e.g. a few hours a month" /></label>
      </div>
      <label className="field-label">Skills or resources you can offer<input name="skills" className="field-control" placeholder="e.g. carpentry, HR, transportation" /></label>
      <label className="field-label">Anything else?<textarea name="message" className="field-control min-h-28 resize-y" /></label>
      <ErrorText error={error} />
      <Button type="submit" disabled={state === 'submitting'} className="w-full bg-navy text-cream hover:bg-navy/90 sm:w-fit">
        {state === 'submitting' ? 'Sending…' : 'Send this to the team'}
      </Button>
    </form>
  )
}

export function ContactForm() {
  const { state, error, submit } = useInquiry()

  if (state === 'success') {
    return (
      <SuccessCard>
        <p className="font-semibold">Thanks for reaching out.</p>
        <p className="mt-1">{RESPONSE_LINE}</p>
      </SuccessCard>
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    submit({
      type: 'contact',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      subject: String(form.get('subject') || ''),
      message: String(form.get('message') || ''),
      company: String(form.get('company') || ''),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Name<span className="ml-1 text-red">*</span><input required name="name" className="field-control" autoComplete="name" /></label>
        <label className="field-label">Email<span className="ml-1 text-red">*</span><input required type="email" name="email" className="field-control" autoComplete="email" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">Phone <span className="font-normal normal-case tracking-normal text-charcoal/40">(optional)</span><input type="tel" name="phone" className="field-control" autoComplete="tel" /></label>
        <label className="field-label">Subject<input name="subject" className="field-control" placeholder="How can we help?" /></label>
      </div>
      <label className="field-label">Message<span className="ml-1 text-red">*</span><textarea required name="message" className="field-control min-h-40 resize-y" /></label>
      <ErrorText error={error} />
      <Button type="submit" disabled={state === 'submitting'} className="w-full bg-navy text-cream hover:bg-navy/90 sm:w-fit">
        {state === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
