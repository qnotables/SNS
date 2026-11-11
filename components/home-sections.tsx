import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Flag, ShieldCheck, Compass, HeartHandshake } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ButtonLink, Container, Eyebrow, PillarCard, ProcessSteps, SectionHeading, pillars } from '@/components/site-sections'

export function HomeHero() {
  return <section className="overflow-hidden bg-navy text-cream">
    <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
      <div>
        <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-cream/80"><span className="h-px w-8 bg-gold" />Veteran-led. Mission-driven.</p>
        <h1 className="max-w-3xl text-5xl leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">A Hand Up for<br className="hidden sm:block" /> Those Who Served.</h1>
        <p className="mt-6 max-w-xl text-xl leading-8 text-cream/90">Building a path from hardship to independence.</p>
        <p className="mt-4 max-w-xl text-base leading-8 text-cream/80">Shepherds Not Sheep is developing programs focused on housing stability, veteran advocacy, education, employment, practical life skills, and community support.</p>
        <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/veteran-resources" variant="light">Find Veteran Resources</ButtonLink><Link href="/donate" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-cream/60 px-5 py-3 text-sm font-semibold text-cream hover:bg-cream/10">Support Our Mission<ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <Link href="/get-involved" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cream underline underline-offset-4">Get Involved <ArrowRight className="size-4" aria-hidden="true" /></Link>
      </div>
      <figure className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image src="/images/sns-hero-workshop.png" alt="Illustrative workshop scene representing the hands-on support model we are developing" fill priority sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
        </div>
        <figcaption className="mt-4 flex items-start justify-between gap-4 border-t border-cream/25 pt-4 text-xs leading-6 text-cream/80"><span>Practical skills. Shared purpose.<br />A vision for the work ahead.</span><span className="text-right">Illustrative imagery.<br />Direct programs in development.</span></figcaption>
      </figure>
    </Container>
    <div className="border-t border-cream/20 bg-olive">
      <Container className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"><p className="flex max-w-3xl items-start gap-3 text-sm leading-6 text-cream"><ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><span>A 501(c)(3) nonprofit. Our direct-service programs are in development; immediate housing or financial assistance is not available through SNS.</span></p><Link href="/transparency" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-cream underline underline-offset-4">Where we stand<ArrowRight className="size-4" aria-hidden="true" /></Link></Container>
    </div>
  </section>
}

export function HomeMission() {
  return <section className="bg-background py-20 sm:py-24"><Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24"><SectionHeading eyebrow="The mission" title="Service does not end. Neither should support." /><div className="readable-copy"><p className="text-xl text-foreground">Every veteran deserves the chance to build a stable, independent, and purposeful life.</p><p>We are building a community rooted in dignity, personal responsibility, and service. Our long-term model connects practical support with education, useful work, mentorship, and a renewed sense of belonging.</p><p>Today, we can help you find official resources and start a conversation. Our direct programs are still being developed, and we will always be honest about what is available.</p><Link href="/our-mission" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline underline-offset-4">Our mission and values<ArrowRight className="size-4" aria-hidden="true" /></Link></div></Container></section>
}

export function HomePrograms() {
  return <section className="border-y border-border bg-secondary/50 py-20 sm:py-24"><Container><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><SectionHeading eyebrow="What we are building" title="Six connected paths. One purpose."><p>Our planned programs are designed to work together, from a stable foundation toward lasting independence. None is currently an active direct-service program.</p></SectionHeading><ButtonLink href="/programs" variant="outline" className="self-start lg:self-auto">All planned programs</ButtonLink></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{pillars.map((pillar) => <PillarCard key={pillar.slug} {...pillar} />)}</div></Container></section>
}

export function HomePathway() {
  return <section className="bg-background py-20 sm:py-24"><Container><SectionHeading eyebrow="How we intend to help" title="A path forward, built around the person."><p>This is the future support model we are developing—not a promise of currently available housing, enrollment, or placement.</p></SectionHeading><div className="mt-14"><ProcessSteps /></div><Link href="/veteran-resources" className="mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline underline-offset-4">Need help today? Find available resources<ArrowRight className="size-4" aria-hidden="true" /></Link></Container></section>
}

const involvement = [
  { title: 'Donate', description: 'Support the systems, partnerships, and foundation behind the mission.', href: '/donate' },
  { title: 'Volunteer', description: 'Share your time, skills, or interest as opportunities take shape.', href: '/get-involved#involvement-form' },
  { title: 'Become a Partner', description: 'Start a conversation about resources, expertise, and shared goals.', href: '/get-involved#involvement-form' },
  { title: 'Sponsor a Program', description: 'Explore how your organization could support a planned program.', href: '/get-involved#involvement-form' },
]

export function HomeInvolvement() {
  return <section className="bg-olive py-20 text-cream sm:py-24"><Container><div className="grid gap-8 lg:grid-cols-[1fr_0.65fr]"><SectionHeading light eyebrow="Stand with veterans" title="There is a place for you in this mission." /><p className="max-w-xl self-end text-base leading-8 text-cream/90">Building something meaningful takes a community. Whether you give, volunteer, partner, or sponsor, start with a conversation about what is possible.</p></div><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{involvement.map((item, index) => <article key={item.title} className="flex flex-col gap-4 border-t border-cream/35 pt-5"><span className="text-xs tracking-widest text-cream/80">0{index + 1}</span><h3 className="text-2xl">{item.title}</h3><p className="flex-1 text-sm leading-7 text-cream/90">{item.description}</p><Link href={item.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cream underline underline-offset-4">{item.title}<ArrowRight className="size-4" aria-hidden="true" /></Link></article>)}</div><p className="mt-10 border-t border-cream/25 pt-6 text-sm leading-7 text-cream/90">Donations are tax-deductible to the extent allowed by law. We do not promise specific outcomes or services in return for a contribution.</p></Container></section>
}

export function HomeTrust() {
  return <section className="bg-background py-20 sm:py-24"><Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24"><div><Eyebrow>Veteran-founded. Built in the open.</Eyebrow><h2 className="mt-4 text-4xl leading-tight tracking-tight text-navy">Integrity is part of the foundation.</h2><p className="mt-6 text-base leading-8 text-muted-foreground">Founded by a U.S. Army veteran, Shepherds Not Sheep is shaped by the challenges of military transition and the conviction that no veteran should face the next chapter alone.</p><div className="mt-7 flex flex-wrap gap-5"><Link href="/our-story" className="inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline underline-offset-4">Read our story<ArrowRight className="size-4" aria-hidden="true" /></Link><Link href="/transparency" className="inline-flex min-h-11 items-center gap-2 font-semibold text-olive underline underline-offset-4">Transparency & accountability<ArrowRight className="size-4" aria-hidden="true" /></Link></div></div><div className="flex flex-col divide-y divide-border border-y border-border">{[
    { icon: Flag, title: '501(c)(3) nonprofit', detail: 'Tax-exempt status approved; donations are tax-deductible to the extent allowed by law.', status: 'Approved' },
    { icon: Compass, title: 'Direct programs', detail: 'Housing, training, and other direct-service programs are still being developed.', status: 'In development' },
    { icon: HeartHandshake, title: 'Support today', detail: 'Official resource links, contact intake, and secure online giving.', status: 'Available' },
  ].map((item) => <div key={item.title} className="flex items-start gap-4 py-6"><item.icon className="mt-1 size-6 shrink-0 text-olive" aria-hidden="true" /><div className="flex-1"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl text-navy">{item.title}</h3><Badge variant="secondary">{item.status}</Badge></div><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p></div></div>)}</div></Container></section>
}
