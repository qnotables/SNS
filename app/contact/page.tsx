import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { ContactForm } from '@/components/site-forms'
import { ButtonLink, Container, PageHero, SectionHeading } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Start a conversation" title="Let&apos;s find the next right step." description="Have a question, idea, referral, or resource to share? Use the form below as a placeholder for our future contact channel." />
    <section className="bg-cream py-20 sm:py-28"><Container><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div><SectionHeading eyebrow="Contact" title="We are listening." /><div className="mt-8 border-t border-navy/15 pt-5"><p className="eyebrow">Contact details</p><p className="mt-3 text-sm leading-7 text-charcoal/65">Email, phone, and social channels are placeholders while the organization is being established.</p><p className="mt-6 text-sm font-semibold text-navy">General contact: coming soon</p></div><div className="mt-8 border-t border-navy/15 pt-5"><p className="eyebrow">Are you a veteran seeking help?</p><p className="mt-3 text-sm leading-7 text-charcoal/65">Use the dedicated assistance path so your message can be shaped around immediate needs.</p><ButtonLink href="/veteran-assistance" variant="outline" className="mt-5">Request assistance <ArrowRight data-icon="inline-end" aria-hidden="true" /></ButtonLink></div></div><div className="rounded-sm border border-navy/15 bg-[#ebe6dc] p-6 sm:p-8"><ContactForm /></div></div></Container></section>
  </>
}
