import type { Metadata } from 'next'
import { Container, Eyebrow, PageHero, SectionHeading, StatusRow } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Transparency' }

const LAST_UPDATED = 'September 24, 2026'

const active = [
  ['Secure online donations', 'Active', 'One-time and monthly giving is processed securely through Stripe.'],
  ['Get Help contact intake', 'Active', 'Veterans can reach a real person through the Get Help form; we respond within 2 business days.'],
  ['Resource referrals', 'Active', 'We help point veterans toward VA benefits and community resources whenever possible.'],
]

const planned = [
  ['Direct programs', 'Pre-launch', 'The six-pillar service model is being designed and is not yet operating.'],
  ['Community partnerships', 'Developing', 'Relationships with organizations, mentors, and local resources are being built.'],
  ['Formal veteran intake program', 'In development', 'A structured intake and case-support process is being designed.'],
]

const rows = [
  ['Nonprofit registration information', 'To be published', 'Official registration details will be added when confirmed.'],
  ['EIN and tax information', 'To be published', 'No tax status, exemption, or tax-deductibility is being represented here.'],
  ['Leadership and board members', 'In development', 'Founded and led by U.S. Army veteran Sergeant Michael Thielmeier; board and governance details will be published with appropriate context.'],
  ['Annual and financial reports', 'Coming soon', 'Reports will be shared as the organization establishes reporting history.'],
  ['Policies', 'In development', 'Core policies and governance materials are being prepared.'],
  ['Major funding sources', 'To be published', 'Funding relationships will be disclosed when active and confirmed.'],
  ['Program outcomes', 'Coming soon', 'Outcomes will be reported only after programs are operating and measurable.'],
  ['Donation allocation', 'To be published', 'Future giving pages will explain how contributions are allocated.'],
]

export default function TransparencyPage() {
  return <>
    <PageHero eyebrow="Accountability" title="What we know. What we are building." description="Shepherds Not Sheep is in development. This page is a clear, public record of the organization as it takes shape — what exists today, and what is still planned." />
    <section className="bg-cream pt-12"><Container><p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Last updated: {LAST_UPDATED}</p></Container></section>
    <section className="bg-cream py-16 sm:py-20"><Container><div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div><Eyebrow>Available today</Eyebrow><h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">What services are active.</h2><div className="mt-6 border-t border-navy/15">{active.map(([title, status, description]) => <StatusRow key={title} title={title} status={status} description={description} />)}</div></div>
      <div><Eyebrow>Still being built</Eyebrow><h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">What services are planned.</h2><div className="mt-6 border-t border-navy/15">{planned.map(([title, status, description]) => <StatusRow key={title} title={title} status={status} description={description} />)}</div></div>
    </div></Container></section>
    <section className="border-t border-navy/10 bg-cream py-16 sm:py-20"><Container><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><SectionHeading eyebrow="Public record" title="Organizational milestones, published carefully." /><div className="border-t border-navy/15">{rows.map(([title, status, description]) => <StatusRow key={title} title={title} status={status} description={description} />)}</div></div></Container></section>
    <section className="bg-olive py-20 text-cream sm:py-28"><Container><div className="max-w-3xl"><SectionHeading light eyebrow="Our standard" title="Do not overstate what is not yet true." /><p className="mt-7 text-lg leading-8 text-cream/75">We will not fabricate nonprofit status, partnerships, grants, sponsors, residents, properties, donations, statistics, endorsements, or success stories. Donations are not tax-deductible at this time. Transparency is not a future feature; it is the foundation.</p></div></Container></section>
  </>
}
