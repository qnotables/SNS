import type { Metadata } from 'next'
import { ButtonLink, Container, PageHero, SectionHeading, StatusRow } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Donate' }

export default function DonatePage() {
  return <>
    <PageHero eyebrow="Support the mission" title="Help build the foundation." description="Your support can help Shepherds Not Sheep develop a responsible, transparent community for veterans. Donation processing is not connected yet." />
    <section className="bg-cream py-20 sm:py-28"><Container><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><SectionHeading eyebrow="Ways to give" title="Support with intention." /><p className="mt-6 text-base leading-8 text-charcoal/65">Future giving options will be published with clear information about how funds are received, stewarded, and allocated.</p></div><div className="border-t border-navy/15"><StatusRow title="One-time donations" status="Coming soon" description="A simple way to make a single contribution." /><StatusRow title="Monthly support" status="In development" description="Recurring support for future operating needs." /><StatusRow title="Sponsor a program" status="Planned" description="Support a specific pillar as programs become active." /><StatusRow title="Corporate support" status="In development" description="Partnership opportunities for businesses and organizations." /><StatusRow title="In-kind donations" status="Planned" description="Materials, equipment, and practical resources." /></div></div></Container></section>
    <section className="border-y border-navy/10 bg-[#ebe6dc] py-20 sm:py-28"><Container><div className="mx-auto max-w-3xl text-center"><p className="eyebrow text-olive">Stewardship first</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Credibility is built in the open.</h2><p className="mt-6 text-base leading-8 text-charcoal/70">We will not claim a donation channel, tax status, program outcome, or funding relationship before it is confirmed and ready to publish. Visit our transparency page to see what information is still being developed.</p><ButtonLink href="/transparency" variant="outline" className="mt-8">View transparency plan</ButtonLink></div></Container></section>
  </>
}
