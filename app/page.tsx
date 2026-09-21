import Link from 'next/link'
import { MapPin, Flag, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ButtonLink, Callout, Container, Eyebrow, SectionHeading, pillars, PillarCard, ProcessSteps } from '@/components/site-sections'
import { CrisisBlock } from '@/components/crisis-block'

export const dynamic = 'force-dynamic'

const trust = [
  { icon: Flag, label: 'Founded by', value: 'A U.S. Army veteran, for fellow veterans.' },
  { icon: MapPin, label: 'Service focus', value: 'Starting locally, with room to grow.' },
  { icon: Compass, label: 'Current status', value: 'Organization in formation. Programs in development.' },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-navy/10 bg-navy text-cream">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow light>Shepherds Not Sheep</Eyebrow>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">A hand up for those who served.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-cream/75 sm:text-xl">Housing. Purpose. Skills. Community. We help homeless and distressed veterans rebuild stable, independent lives.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/veteran-assistance" variant="light">Get Help</ButtonLink>
              <Button render={<Link href="/get-involved" />} nativeButton={false} variant="outline" size="lg" className="border-cream/40 bg-transparent text-cream hover:bg-cream/10">Get Involved<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
            </div>
            <p className="mt-7 text-sm leading-7 text-cream/55">Our programs are still being built. This site describes what we are creating and how to reach us today.</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img src="/images/sns-logo.png" alt="Shepherds Not Sheep" className="w-full max-w-md rounded-sm bg-cream/95 p-6 object-contain" />
          </div>
        </Container>
      </section>

      <section className="border-b border-navy/10 bg-[#f4f0e8] py-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {trust.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-olive/30 bg-olive/10 text-olive"><item.icon className="size-5" aria-hidden="true" /></span>
                <div>
                  <p className="eyebrow text-charcoal/40">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-charcoal/75">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What we are building" title="Six ways we plan to walk alongside veterans.">
            <p>Each area below is in development. Together they form a path from immediate stability toward lasting independence.</p>
          </SectionHeading>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => <PillarCard key={pillar.title} {...pillar} />)}
          </div>
        </Container>
      </section>

      <section className="border-y border-navy/10 bg-[#ebe6dc] py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How it will work" title="A clear path, one step at a time." />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CrisisBlock />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">Started by someone who has been there.</h2>
            </div>
            <div className="text-lg leading-8 text-charcoal/75">
              <p>Shepherds Not Sheep grew out of a simple conviction: veterans who have carried heavy loads deserve a community that helps them carry the next one. We are building that community deliberately and honestly.</p>
              <Link href="/our-story" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-olive hover:text-navy">Read our story <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <Callout eyebrow="Get started" title="Whether you need help or want to help — start here." description="Reach out today. We read every message and respond within 2 business days." href="/veteran-assistance" label="Get Help" />
    </>
  )
}
