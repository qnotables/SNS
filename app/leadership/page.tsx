import { Container, PageHero, SectionHeading, ButtonLink } from '@/components/site-sections'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('Leadership', 'Veteran-founded leadership and a commitment to responsible organizational development at Shepherds Not Sheep.', '/leadership')

export default function LeadershipPage() {
  return <>
    <PageHero eyebrow="Leadership" title="Veteran-founded. Mission-led." description="Lived experience informs our purpose. Integrity guides how we build." />
    <section className="py-20"><Container className="grid gap-10 lg:grid-cols-2"><SectionHeading eyebrow="Founder perspective" title="Experience that shapes the mission." /><div className="readable-copy"><p>Shepherds Not Sheep was founded and is led by a U.S. Army veteran who understands the challenges of military transition, disability, benefits, and civilian life. That experience informs the commitment to practical support, mentorship, and greater independence.</p><p>The founder has chosen to keep identifying personal information private. This does not change our commitment to clear organizational information and honest communication about our capabilities.</p><p>Additional approved leadership and governance information will be shared as it becomes available. We will not publish unconfirmed board appointments, biographies, credentials, or affiliations.</p><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/transparency">View transparency</ButtonLink><ButtonLink href="/contact" variant="outline">Contact the organization</ButtonLink></div></div></Container></section>
  </>
}
