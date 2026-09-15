import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BriefcaseBusiness, Camera, GraduationCap, Home, Scale, UsersRound, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'text-cream/55' : 'text-olive'}`}>{children}</p>
}

export function SectionHeading({ eyebrow, title, children, light = false, align = 'left' }: { eyebrow?: string; title: string; children?: React.ReactNode; light?: boolean; align?: 'left' | 'center' }) {
  return <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}>
    {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
    <h2 className={`mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl ${light ? 'text-cream' : 'text-navy'}`}>{title}</h2>
    {children && <div className={`mt-5 text-base leading-8 ${light ? 'text-cream/70' : 'text-charcoal/70'}`}>{children}</div>}
  </div>
}

export function PageHero({ eyebrow, title, description, accent = 'cream', image }: { eyebrow: string; title: string; description: string; accent?: 'cream' | 'navy'; image?: string }) {
  const dark = accent === 'navy'
  return <section className={`${dark ? 'bg-navy text-cream' : 'bg-cream text-navy'} relative overflow-hidden border-b border-navy/10`}>
    <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:py-32">
      <div className="relative z-10 max-w-3xl"><Eyebrow light={dark}>{eyebrow}</Eyebrow><h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl">{title}</h1><p className={`mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>{description}</p></div>
      {image ? <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]"><Image src={image} alt="" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /></div> : <div className={`pointer-events-none absolute -right-20 top-1/2 hidden size-72 -translate-y-1/2 rounded-full border ${dark ? 'border-cream/10' : 'border-navy/10'} lg:block`} aria-hidden="true"><div className={`absolute inset-8 rounded-full border ${dark ? 'border-cream/10' : 'border-navy/10'}`} /><div className={`absolute inset-16 rounded-full border ${dark ? 'border-cream/10' : 'border-navy/10'}`} /></div>}
    </Container>
  </section>
}

export function PhotoBand({ src, alt, eyebrow, title, description, dark = false }: { src: string; alt: string; eyebrow: string; title: string; description: string; dark?: boolean }) {
  return <section className={dark ? 'bg-navy text-cream' : 'bg-[#ebe6dc] text-navy'}><Container className="grid gap-0 lg:grid-cols-2"><div className="relative min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[560px]"><Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div><div className="flex flex-col justify-center px-0 py-16 sm:py-20 lg:px-16 lg:py-24"><Eyebrow light={dark}>{eyebrow}</Eyebrow><h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{title}</h2><p className={`mt-6 max-w-xl text-base leading-8 ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>{description}</p></div></Container></section>
}

export function ButtonLink({ href, children, variant = 'default', className = '' }: { href: string; children: React.ReactNode; variant?: 'default' | 'outline' | 'light'; className?: string }) {
  return <Button render={<Link href={href} />} nativeButton={false} variant={variant === 'light' ? 'secondary' : variant} className={`${variant === 'default' ? 'bg-navy text-cream hover:bg-navy/90' : ''} ${variant === 'light' ? 'bg-cream text-navy hover:bg-cream/90' : ''} ${className}`} size="lg">{children}<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
}

export function Callout({ eyebrow, title, description, href, label, dark = true }: { eyebrow: string; title: string; description: string; href: string; label: string; dark?: boolean }) {
  return <section className={dark ? 'bg-navy text-cream' : 'bg-olive text-cream'}><Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><Eyebrow light>{eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h2><p className="mt-4 text-base leading-8 text-cream/70">{description}</p></div><ButtonLink href={href} variant="light" className="self-start lg:self-auto">{label}</ButtonLink></Container></section>
}

export const pillars: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Stability', description: 'Housing, food, transportation, basic necessities, and a stable environment where veterans can begin rebuilding.', icon: Home },
  { title: 'Veteran Advocacy', description: 'Helping veterans identify and navigate VA benefits, government programs, nonprofit resources, and community services.', icon: Scale },
  { title: 'Education & Employment', description: 'College opportunities, certifications, vocational training, technology skills, resume assistance, job preparation, and career development.', icon: GraduationCap },
  { title: 'Entrepreneurship', description: 'Business education, financial literacy, sales, online commerce, mentorship, and small-business development.', icon: BriefcaseBusiness },
  { title: 'Skills & Self-Sufficiency', description: 'Hands-on opportunities involving woodworking, CNC operation, construction, gardening, sustainable agriculture, property maintenance, animal husbandry, and practical life skills.', icon: Wrench },
  { title: 'Community & Purpose', description: 'Veteran mentorship, peer support, community projects, recreation, volunteering, and opportunities to rebuild a sense of mission and belonging.', icon: UsersRound },
]

export function PillarCard({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return <article className="group flex min-h-[265px] flex-col justify-between border border-navy/15 bg-cream p-6 transition-colors hover:border-olive/50 hover:bg-[#faf8f3] sm:p-7"><div className="flex items-start justify-between gap-5"><span className="flex size-12 items-center justify-center rounded-full border border-olive/30 bg-olive/10 text-olive"><Icon aria-hidden="true" /></span><span className="eyebrow text-charcoal/35">Planned</span></div><div><h3 className="mt-10 text-2xl font-semibold text-navy">{title}</h3><p className="mt-3 text-sm leading-7 text-charcoal/65">{description}</p></div></article>
}

export function ProcessSteps() {
  const steps = [['01', 'Reach Out', 'A veteran contacts Shepherds Not Sheep or is referred by a partner organization.'], ['02', 'Stabilize', 'Immediate needs such as food, shelter, benefits, transportation, and other essential resources are evaluated.'], ['03', 'Build a Plan', 'The veteran works with mentors and professionals to create an individualized reestablishment plan based on their needs, abilities, interests, and goals.'], ['04', 'Move Forward', 'The veteran develops the skills, resources, employment, education, business opportunities, and support network needed to establish greater independence.']]
  return <div className="relative grid gap-9 before:absolute before:bottom-8 before:left-5 before:top-5 before:w-px before:bg-navy/15 md:grid-cols-2 md:before:hidden lg:grid-cols-4 lg:gap-0 lg:before:bottom-auto lg:before:left-[12.5%] lg:before:right-[12.5%] lg:before:top-5 lg:before:h-px lg:before:w-auto">{steps.map(([number, title, description]) => <article key={number} className="relative z-10 pl-14 md:border-l md:border-navy/15 md:pl-5 lg:border-l-0 lg:px-6 lg:pt-12 lg:text-center"><span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-red bg-cream font-mono text-xs font-bold text-red md:left-[-21px] lg:left-1/2 lg:top-0 lg:-translate-x-1/2">{number}</span><h3 className="text-xl font-semibold text-navy lg:mt-5">{title}</h3><p className="mt-3 text-sm leading-7 text-charcoal/65">{description}</p></article>)}</div>
}

export function FounderPhotoFrame() {
  return <figure className="relative min-h-[360px] overflow-hidden border border-navy/15 bg-navy p-7 text-cream sm:min-h-[470px]"><div className="absolute inset-5 border border-cream/20" /><div className="relative flex h-full min-h-[300px] flex-col justify-between"><div className="flex size-14 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream/70"><Camera aria-hidden="true" /></div><figcaption><p className="eyebrow text-cream/50">Founder portrait</p><p className="mt-3 max-w-xs font-display text-2xl leading-tight text-cream/85">A professional portrait will be added here as the organization develops.</p></figcaption></div></figure>
}

const futurePrograms = [
  { title: 'Woodworking', image: '/images/sns-craftsmanship.png', alt: 'Hands shaping wood on a workshop bench' },
  { title: 'Sustainable agriculture', image: '/images/sns-agriculture.png', alt: 'A veteran and mentor walking through a community garden' },
  { title: 'CNC-produced goods', image: '/images/sns-cnc.png', alt: 'A craftsman working beside a compact CNC machine' },
  { title: 'Community projects', image: '/images/sns-community.png', alt: 'Veterans and mentors gathered around a workshop table' },
  { title: 'Online marketplaces', image: '/images/sns-commerce.png', alt: 'Hands preparing a handmade order for shipment' },
  { title: 'Veteran-developed businesses', image: '/images/sns-entrepreneurship.png', alt: 'Two adults reviewing a business plan across a workshop table' },
]

export function FutureProgramTiles() {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{futurePrograms.map((program) => <article key={program.title} className="group relative min-h-[230px] overflow-hidden bg-charcoal"><Image src={program.image} alt={program.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/20 to-transparent" /><div className="relative flex min-h-[230px] items-end p-5"><h3 className="max-w-[14rem] text-2xl font-semibold leading-tight text-cream">{program.title}</h3></div></article>)}</div>
}

export function StatusRow({ title, status, description }: { title: string; status: string; description: string }) {
  return <div className="flex flex-col gap-3 border-t border-navy/15 py-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold text-navy">{title}</h3><p className="mt-1 text-sm leading-6 text-charcoal/60">{description}</p></div><span className="w-fit rounded-full border border-olive/30 bg-olive/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-olive">{status}</span></div>
}

export function LinkList({ items }: { items: { title: string; description: string; href?: string }[] }) {
  return <div className="grid gap-4 sm:grid-cols-2">{items.map((item) => <div key={item.title} className="flex gap-4 rounded-sm border border-navy/15 bg-cream p-5"><div className="mt-1 size-2 shrink-0 rounded-full bg-red" /><div><h3 className="font-semibold text-navy">{item.title}</h3><p className="mt-2 text-sm leading-7 text-charcoal/65">{item.description}</p>{item.href && <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-olive hover:text-navy">Learn more <ArrowRight aria-hidden="true" /></Link>}</div></div>)}</div>
}
