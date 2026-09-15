import type { Metadata } from 'next'
import { ButtonLink, Callout, Container, LinkList, PageHero, SectionHeading } from '@/components/site-sections'

export const metadata: Metadata = { title: 'Get Involved' }

const opportunities = [
  ['Volunteer', 'Give time, consistency, and practical support as the organization takes shape.'],
  ['Become a Mentor', 'Share perspective, encouragement, and knowledge with a veteran working toward the next step.'],
  ['Business Partnerships', 'Help create pathways to employment, work experience, and business development.'],
  ['Skilled Trades Partnerships', 'Bring hands-on instruction and real-world skills into future programs.'],
  ['Educational Partnerships', 'Connect veterans to learning, certifications, technology, and career preparation.'],
  ['Donate Materials or Equipment', 'Contribute the tools, supplies, and resources a practical community will need.'],
  ['Corporate Sponsorship', 'Support the foundation of long-term programs with responsible investment.'],
  ['Community Partnerships', 'Coordinate with organizations that share a commitment to veterans and stability.'],
]

export default function GetInvolvedPage() {
  return <>
    <PageHero eyebrow="Join the work" title="A path forward takes a community." description="Shepherds Not Sheep is in development, and the strongest foundation will be built with people who bring time, skills, resources, and care." />
    <section className="bg-cream py-20 sm:py-28"><Container><SectionHeading eyebrow="Ways to participate" title="Bring what you can." children={<p>Every opportunity below is a future-facing path. We will publish active openings, requirements, and contacts as they become available.</p>} /><div className="mt-14"><LinkList items={opportunities.map(([title, description]) => ({ title, description }))} /></div></Container></section>
    <Callout eyebrow="Start a conversation" title="Have an idea, resource, or partnership to offer?" description="Tell us what you bring and what kind of impact you hope to make. This contact path is a placeholder while our organization is being built." href="/contact" label="Contact the team" dark={false} />
  </>
}
