import type { Metadata } from 'next'
import { Container, PageHero, SectionHeading, StatusRow } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Transparency' }

const rows = [
  ['Nonprofit registration information', 'To be published', 'Official registration details will be added when confirmed.'],
  ['EIN and tax information', 'To be published', 'No tax status or exemption is being represented here.'],
  ['Leadership and board members', 'In development', 'Leadership details will be published with appropriate context.'],
  ['Annual and financial reports', 'Coming soon', 'Reports will be shared as the organization establishes reporting history.'],
  ['Policies', 'In development', 'Core policies and governance materials are being prepared.'],
  ['Major funding sources', 'To be published', 'Funding relationships will be disclosed when active and confirmed.'],
  ['Program outcomes', 'Coming soon', 'Outcomes will be reported only after programs are operating and measurable.'],
  ['Donation allocation', 'To be published', 'Future giving pages will explain how contributions are allocated.'],
]

export default function TransparencyPage() {
  return <>
    <PageHero eyebrow="Accountability" title="What we know. What we are building." description="Shepherds Not Sheep is in development. This page is designed to become a clear, public record of the organization as it takes shape." />
    <section className="bg-cream py-20 sm:py-28"><Container><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><SectionHeading eyebrow="Public record" title="Honest information, published carefully." /><div className="border-t border-navy/15">{rows.map(([title, status, description]) => <StatusRow key={title} title={title} status={status} description={description} />)}</div></div></Container></section>
    <section className="bg-olive py-20 text-cream sm:py-28"><Container><div className="max-w-3xl"><SectionHeading light eyebrow="Our standard" title="Do not overstate what is not yet true." /><p className="mt-7 text-lg leading-8 text-cream/75">We will not fabricate nonprofit status, partnerships, grants, sponsors, residents, properties, donations, statistics, endorsements, or success stories. Transparency is not a future feature; it is the foundation.</p></div></Container></section>
  </>
}
