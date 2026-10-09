import Link from 'next/link'
import { MapPin, Flag, Compass, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonLink, Callout, Container, Eyebrow, SectionHeading, pillars, PillarCard, ProcessSteps } from '@/components/site-sections'
import { CrisisBlock } from '@/components/crisis-block'

export const dynamic = 'force-dynamic'

const trust = [
  { icon: Flag, label: 'Founded by', value: 'A U.S. Army veteran, for fellow veterans.' },
  { icon: MapPin, label: 'Service focus', value: 'Starting locally, with room to grow.' },
  { icon: Compass, label: 'Current status', value: 'Organization in formation. Programs in development.' },
]

const milestones = [
  { title: 'Organization Formation', status: 'In Progress', description: 'Core structure, mission, and operating foundation are being established.' },
  { title: 'Nonprofit / 501(c)(3) Status', status: 'To Be Published', description: 'No tax-exempt status is claimed. Official details will be posted only once confirmed.' },
  { title: 'Community Partnerships', status: 'Developing', description: 'Building relationships with organizations, mentors, and local resources.' },
  { title: 'Veteran Assistance Intake', status: 'In Development', description: 'Today the contact form starts a conversation — it is not yet a formal intake program.' },
  { title: 'Fundraising Infrastructure', status: 'Active', description: 'Secure one-time and monthly giving is live through Stripe.' },
  { title: 'Direct Programs', status: 'Pre-Launch', description: 'The six-pillar service model is being designed and is not yet operating.' },
]

function MilestoneCard({ title, status, description }: { title: string; status: string; description: string }) {
  const active = status === 'Active'
  return (
    <article className="flex flex-col justify-between gap-4 border border-navy/15 border-t-4 border-t-olive bg-cream p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug text-navy">{title}</h3>
        <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${active ? 'border border-red/30 bg-red/10 text-red' : 'border border-olive/30 bg-olive/10 text-olive'}`}>{status}</span>
      </div>
      <p className="text-sm leading-7 text-charcoal/65">{description}</p>
    </article>
  )
}

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
            <div className="mt-9 max-w-xl rounded-sm border border-cream/20 bg-cream/5 p-5">
              <p className="text-sm leading-7 text-cream/80">Organization in formation. Programs and partnerships are currently being developed.</p>
              <Link href="/transparency" className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-cream underline decoration-red decoration-2 underline-offset-4 hover:text-cream/80">View our current status and transparency information <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
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

      <section className="border-b border-navy/10 bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Building in the Open</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">Transparency from the very beginning.</h2>
              <p className="mt-6 text-lg leading-8 text-charcoal/75">Shepherds Not Sheep is being built with transparency from the beginning. Our programs, partnerships, organizational structure, and support systems are still under development. We believe supporters, veterans, and the public should be able to clearly see where we are, what exists today, and what is still being built.</p>
              <div className="mt-8">
                <ButtonLink href="/transparency">View Our Transparency Page</ButtonLink>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex size-40 items-center justify-center rounded-full border border-olive/30 bg-olive/10 text-olive"><ShieldCheck className="size-20" aria-hidden="true" /></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="rounded-sm border border-navy/15 bg-[#f4f0e8] p-7 sm:p-10">
            <Eyebrow>Our Planned Service Model</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">The programs below represent the service model Shepherds Not Sheep is building.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-charcoal/70">Some services are not yet directly available through our organization. If you need help today, use our Get Help page. We will help connect you with currently available resources and organizations whenever possible.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/veteran-assistance">Get Help Now</ButtonLink>
              <Button render={<Link href="/programs" />} nativeButton={false} variant="outline" size="lg" className="border-navy/25 bg-transparent text-navy hover:bg-navy/5">View Planned Programs<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="What we are building" title="Six Pillars of the Shepherds Not Sheep Model.">
              <p>Each pillar below is in development. Together they form a path from immediate stability toward lasting independence.</p>
            </SectionHeading>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar) => <PillarCard key={pillar.title} {...pillar} />)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-navy/10 bg-[#ebe6dc] py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How it will work" title="How the Future Support Model Is Designed to Work.">
            <p>This process represents the support pathway Shepherds Not Sheep is working to build.</p>
          </SectionHeading>
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Progress" title="Where We Are Now.">
            <p>An honest snapshot of the organization&apos;s current status. We publish only what is accurate and supported today.</p>
          </SectionHeading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((item) => <MilestoneCard key={item.title} {...item} />)}
          </div>
          <div className="mt-10">
            <Link href="/transparency" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-olive hover:text-navy">See Full Transparency Details <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-navy/10 bg-navy py-20 text-cream sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow light>Support the mission</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Help Us Build the Foundation.</h2>
              <p className="mt-6 text-lg leading-8 text-cream/75">Shepherds Not Sheep is still in the development stage. Early support helps build the systems, partnerships, infrastructure, and resources needed to turn this mission into a functioning veteran-support organization.</p>
              <p className="mt-4 text-base leading-8 text-cream/60">Your support helps move the organization from planning to implementation.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/donate" variant="light">Donate</ButtonLink>
                <Button render={<Link href="/donate?fund=founding" />} nativeButton={false} variant="outline" size="lg" className="border-cream/40 bg-transparent text-cream hover:bg-cream/10">Become a Founding Supporter<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
              </div>
              <p className="mt-6 text-xs leading-6 text-cream/50">Shepherds Not Sheep is an organization in formation. Donations are not tax-deductible at this time.</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="flex size-40 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream/80"><HeartHandshake className="size-20" aria-hidden="true" /></div>
            </div>
          </div>
        </Container>
      </section>

      <CrisisBlock />

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Veteran-Founded. Veteran-Led.</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">Started by someone who has been there.</h2>
            </div>
            <div className="text-lg leading-8 text-charcoal/75">
              <p>Shepherds Not Sheep was founded by U.S. Army veteran Sergeant Michael Thielmeier, who has firsthand experience navigating military transition, disability, benefits, and civilian life. That experience shapes a simple conviction: veterans who have carried heavy loads deserve a community that helps them carry the next one.</p>
              <Link href="/our-story" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-olive hover:text-navy">Read Our Story <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <Callout eyebrow="Get started" title="Whether you need help or want to help — start here." description="Reach out today. We read every message and respond within 2 business days." href="/veteran-assistance" label="Get Help" />
    </>
  )
}
