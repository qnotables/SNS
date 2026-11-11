import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, PageHero, SectionHeading, ButtonLink } from '@/components/site-sections'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('About Us', 'Learn about our veteran-led nonprofit, mission, values, and the programs Shepherds Not Sheep is developing.', '/about')

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About Shepherds Not Sheep" title="Built on service. Guided by purpose." description="A veteran-led nonprofit developing practical pathways toward stability, independence, and community." />
    <section className="py-20"><Container className="grid gap-12 lg:grid-cols-2"><SectionHeading eyebrow="Our purpose" title="A hand up, and a path forward." /><div className="readable-copy"><p>Shepherds Not Sheep was founded by a U.S. Army veteran with firsthand experience of the transition to civilian life. Our mission is to help homeless and distressed veterans build stable, independent, and purposeful lives.</p><p>We are a 501(c)(3) nonprofit organization. Our direct-service programs are still in development. Today, this website offers official resource links, a way to contact the team, and secure opportunities to support the mission.</p><p>We value dignity, integrity, personal responsibility, service, and community. We will be clear about what exists, what is planned, and what we cannot provide.</p><div className="mt-7"><ButtonLink href="/transparency" variant="outline">Our current status</ButtonLink></div></div></Container></section>
    <section className="border-t border-border bg-secondary/50 py-16"><Container className="grid gap-5 sm:grid-cols-2">{[
      { title: 'Our Story', description: 'Why the mission began, and the experience that shapes it.', href: '/our-story' },
      { title: 'Mission & Values', description: 'The long-term vision behind the work we are building.', href: '/our-mission' },
      { title: 'Leadership', description: 'Veteran-founded leadership, with privacy and accountability.', href: '/leadership' },
      { title: 'Transparency', description: 'Approved status, current capabilities, and honest program milestones.', href: '/transparency' },
    ].map((item) => <article key={item.href} className="border border-border bg-card p-7"><h2 className="text-2xl text-navy">{item.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{item.description}</p><Link href={item.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline underline-offset-4">Explore {item.title}<ArrowRight className="size-4" aria-hidden="true" /></Link></article>)}</Container></section>
  </>
}
