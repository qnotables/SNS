import type { Metadata } from 'next'
import { pillars, ButtonLink, Container, PageHero, PillarCard, PhotoBand, ProcessSteps, SectionHeading } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Programs' }

export default function ProgramsPage() {
  return <>
    <PageHero eyebrow="Planned programs" title="Support that connects to purpose." description="Our program model is designed to meet immediate needs while creating practical routes toward stability, skills, work, and community." accent="navy" image="/images/sns-hero-workshop.png" />
    <section className="bg-cream py-20 sm:py-28"><Container><SectionHeading eyebrow="Program pillars" title="Six areas of reestablishment." children={<p>These are planned program areas. They will grow through partnerships, resources, and careful stewardship.</p>} /><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{pillars.map((pillar) => <PillarCard key={pillar.title} {...pillar} />)}</div></Container></section>
    <PhotoBand src="/images/sns-craftsmanship.png" alt="Hands measuring a piece of wood on a workbench" eyebrow="Skills & self-sufficiency" title="Practice the work. Build the future." description="Long-term program goals may include hands-on training, entrepreneurship, education, and community projects that make progress visible and useful." dark />
    <section className="border-y border-navy/10 bg-[#ebe6dc] py-20 sm:py-28"><Container><SectionHeading eyebrow="A possible path" title="From reaching out to moving forward." /><div className="mt-14"><ProcessSteps /></div></Container></section>
    <section className="bg-cream py-20 sm:py-28"><Container><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><SectionHeading eyebrow="Long-term goal" title="Build with the community." /><div className="max-w-2xl text-base leading-8 text-charcoal/70"><p>Shepherds Not Sheep intends to bring veterans, the Department of Veterans Affairs, government agencies, businesses, educators, skilled tradespeople, community organizations, and volunteers together around a common mission.</p><p className="mt-6">Program details will be published as they move from idea to active, supported offering.</p><ButtonLink href="/get-involved" variant="outline" className="mt-8">Explore partnerships</ButtonLink></div></div></Container></section>
  </>
}
