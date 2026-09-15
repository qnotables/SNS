import type { Metadata } from 'next'
import { AlertTriangle, ArrowUpRight } from 'lucide-react'
import { AssistanceForm } from '@/components/site-forms'
import { ButtonLink, Container, PageHero, SectionHeading } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Veteran Assistance' }

const categories = ['Housing instability', 'Food insecurity', 'VA benefits and resources', 'Employment', 'Education', 'Financial hardship', 'Business and entrepreneurship', 'Skills training', 'Transportation', 'Community and mentorship']

export default function AssistancePage() {
  return <>
    <PageHero eyebrow="For veterans" title="You do not have to figure out the next step alone." description="If you are facing instability or transition challenges, tell us what you are navigating. Our assistance programs are in development, and this form is a placeholder for a future intake path." />
    <section className="bg-cream py-20 sm:py-28"><Container><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><SectionHeading eyebrow="Where we hope to help" title="Start with what is most urgent." /><p className="mt-6 text-base leading-8 text-charcoal/65">Planned assistance areas include:</p><div className="mt-6 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="border border-navy/15 bg-[#ebe6dc] px-3 py-2 text-xs font-semibold text-navy">{category}</span>)}</div></div><div className="rounded-sm border border-navy/15 bg-[#ebe6dc] p-6 sm:p-8"><p className="eyebrow text-olive">Request assistance</p><h2 className="mt-4 text-2xl font-semibold text-navy">Share a starting point.</h2><p className="mt-3 mb-8 text-sm leading-7 text-charcoal/65">This placeholder does not currently send or store your information.</p><AssistanceForm /></div></div></Container></section>
    <section className="border-y border-red/20 bg-red/10 py-8"><Container><div className="flex items-start gap-4"><AlertTriangle className="mt-1 shrink-0 text-red" aria-hidden="true" /><div><h2 className="font-semibold text-navy">If you are in immediate danger</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-charcoal/75">Shepherds Not Sheep is still developing its programs. Emergency situations requiring immediate medical care, law enforcement, or crisis intervention should use appropriate emergency services in your area.</p></div></div></Container></section>
    <section className="bg-navy py-14 text-cream"><Container className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow text-cream/50">Another way to reach out</p><p className="mt-3 text-xl font-medium">Have a general question or referral?</p></div><ButtonLink href="/contact" variant="light">Contact us <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></ButtonLink></Container></section>
  </>
}
