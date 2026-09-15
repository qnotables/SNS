'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'

function FormNotice({ submitted }: { submitted: boolean }) {
  if (!submitted) return <p className="text-xs leading-6 text-charcoal/55">This form is a design placeholder while our organization is in development. No information is submitted yet.</p>
  return <div role="status" className="border border-olive/25 bg-olive/10 p-4 text-sm leading-6 text-olive">Thank you for reaching out. Form submissions are not connected yet, but this is the right place to begin a future conversation.</div>
}

export function AssistanceForm() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  return <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Name<input required name="name" className="field-control" placeholder="Your name" /></label><label className="field-label">Email<input required type="email" name="email" className="field-control" placeholder="you@example.com" /></label></div><label className="field-label">What kind of help are you looking for?<select name="need" className="field-control"><option>Housing stability</option><option>Food and basic needs</option><option>VA benefits and resources</option><option>Employment or education</option><option>Something else</option></select></label><label className="field-label">Tell us a little more<textarea required name="message" className="field-control min-h-36 resize-y" placeholder="Share only what you feel comfortable sharing." /></label><Button type="submit" className="w-fit bg-red text-cream hover:bg-red/90">Request assistance</Button><FormNotice submitted={submitted} /></form>
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  return <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Name<input required name="name" className="field-control" placeholder="Your name" /></label><label className="field-label">Email<input required type="email" name="email" className="field-control" placeholder="you@example.com" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Phone <span className="font-normal normal-case tracking-normal text-charcoal/40">(optional)</span><input type="tel" name="phone" className="field-control" placeholder="(555) 555-5555" /></label><label className="field-label">I am a...<select name="audience" className="field-control"><option>Veteran</option><option>Supporter</option><option>Potential partner</option><option>Volunteer</option></select></label></div><label className="field-label">Subject<input required name="subject" className="field-control" placeholder="How can we help?" /></label><label className="field-label">Message<textarea required name="message" className="field-control min-h-40 resize-y" placeholder="Write your message here." /></label><Button type="submit" className="w-fit bg-navy text-cream hover:bg-navy/90">Send message</Button><FormNotice submitted={submitted} /></form>
}
