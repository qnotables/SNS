import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, CircleDashed } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'text-cream/55' : 'text-olive'}`}>{children}</p>
}

export function SectionHeading({ eyebrow, title, children, light = false, align = 'left' }: { eyebrow?: string; title: string; children?: React.ReactNode; light?: boolean; align?: 'left' | 'center' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl ${light ? 'text-cream' : 'text-navy'}`}>{title}</h2>
      {children && <div className={`mt-5 text-base leading-8 ${light ? 'text-cream/70' : 'text-charcoal/70'}`}>{children}</div>}
    </div>
  )
}

export function PageHero({ eyebrow, title, description, accent = 'cream' }: { eyebrow: string; title: string; description: string; accent?: 'cream' | 'navy' }) {
  const dark = accent === 'navy'
  return (
    <section className={`${dark ? 'bg-navy text-cream' : 'bg-cream text-navy'} relative overflow-hidden border-b border-navy/10`}>
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <Eyebrow light={dark}>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl">{title}</h1>
          <p className={`mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${dark ? 'text-cream/70' : 'text-charcoal/70'}`}>{description}</p>
        </div>
        <div className={`pointer-events-none absolute -right-20 top-1/2 hidden size-72 -translate-y-1/2 rounded-full border ${dark ? 'border-cream/10' : 'border-navy/10'} lg:block`} aria-hidden="true"><div className={`absolute inset-8 rounded-full border ${dark ? 'border-cream/10' : 'border-navy/10'}`} /><div className={`absolute inset-16 rounded-full border ${dark ? 'border-cream/10' : 'border-navy/10'}`} /></div>
      </Container>
    </section>
  )
}

export function ButtonLink({ href, children, variant = 'default', className = '' }: { href: string; children: React.ReactNode; variant?: 'default' | 'outline' | 'light'; className?: string }) {
  return <Button render={<Link href={href} />} nativeButton={false} variant={variant === 'light' ? 'secondary' : variant} className={`${variant === 'default' ? 'bg-navy text-cream hover:bg-navy/90' : ''} ${variant === 'light' ? 'bg-cream text-navy hover:bg-cream/90' : ''} ${className}`} size="lg">{children}<ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
}

export function Callout({ eyebrow, title, description, href, label, dark = true }: { eyebrow: string; title: string; description: string; href: string; label: string; dark?: boolean }) {
  return (
    <section className={dark ? 'bg-navy text-cream' : 'bg-olive text-cream'}>
      <Container className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl"><Eyebrow light>{eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h2><p className="mt-4 text-base leading-8 text-cream/70">{description}</p></div>
        <ButtonLink href={href} variant="light" className="self-start lg:self-auto">{label}</ButtonLink>
      </Container>
    </section>
  )
}

export const pillars: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Stability', description: 'Housing, food, transportation, basic necessities, and a stable environment where veterans can begin rebuilding.', icon: Check },
  { title: 'Veteran Advocacy', description: 'Helping veterans identify and navigate VA benefits, government programs, nonprofit resources, and community services.', icon: CircleDashed },
  { title: 'Education & Employment', description: 'College opportunities, certifications, vocational training, technology skills, resume assistance, job preparation, and career development.', icon: ArrowRight },
  { title: 'Entrepreneurship', description: 'Business education, financial literacy, sales, online commerce, mentorship, and small-business development.', icon: Check },
  { title: 'Skills & Self-Sufficiency', description: 'Hands-on opportunities involving woodworking, CNC operation, construction, gardening, sustainable agriculture, property maintenance, animal husbandry, and practical life skills.', icon: CircleDashed },
  { title: 'Community & Purpose', description: 'Veteran mentorship, peer support, community projects, recreation, volunteering, and opportunities to rebuild a sense of mission and belonging.', icon: ArrowRight },
]

export function PillarCard({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return <article className="group border-t border-navy/20 pt-5"><div className="flex items-start justify-between gap-4"><h3 className="text-xl font-semibold text-navy">{title}</h3><Icon className="size-5 shrink-0 text-red transition-transform group-hover:translate-x-1" aria-hidden="true" /></div><p className="mt-3 text-sm leading-7 text-charcoal/65">{description}</p></article>
}

export function ProcessSteps() {
  const steps = [
    ['01', 'Reach Out', 'A veteran contacts Shepherds Not Sheep or is referred by a partner organization.'],
    ['02', 'Stabilize', 'Immediate needs such as food, shelter, benefits, transportation, and other essential resources are evaluated.'],
    ['03', 'Build a Plan', 'The veteran works with mentors and professionals to create an individualized reestablishment plan based on their needs, abilities, interests, and goals.'],
    ['04', 'Move Forward', 'The veteran develops the skills, resources, employment, education, business opportunities, and support network needed to establish greater independence.'],
  ]
  return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, description]) => <article key={number} className="relative border-l border-navy/20 pl-5"><span className="eyebrow text-red">{number}</span><h3 className="mt-4 text-xl font-semibold text-navy">{title}</h3><p className="mt-3 text-sm leading-7 text-charcoal/65">{description}</p></article>)}</div>
}

export function StatusRow({ title, status, description }: { title: string; status: string; description: string }) {
  return <div className="flex flex-col gap-3 border-t border-navy/15 py-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold text-navy">{title}</h3><p className="mt-1 text-sm leading-6 text-charcoal/60">{description}</p></div><span className="w-fit rounded-full border border-olive/30 bg-olive/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-olive">{status}</span></div>
}

export function LinkList({ items }: { items: { title: string; description: string; href?: string }[] }) {
  return <div className="grid gap-4 sm:grid-cols-2">{items.map((item) => <div key={item.title} className="flex gap-4 rounded-sm border border-navy/15 bg-cream p-5"><div className="mt-1 size-2 shrink-0 rounded-full bg-red" /><div><h3 className="font-semibold text-navy">{item.title}</h3><p className="mt-2 text-sm leading-7 text-charcoal/65">{item.description}</p>{item.href && <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-olive hover:text-navy">Learn more <ArrowRight aria-hidden="true" /></Link>}</div></div>)}</div>
}
