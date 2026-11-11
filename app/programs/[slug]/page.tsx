import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Info } from 'lucide-react'
import { Container, PageHero, SectionHeading, ButtonLink } from '@/components/site-sections'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CrisisBlock } from '@/components/crisis-block'
import { BreadcrumbData } from '@/components/structured-data'
import { programs, findProgram } from '@/lib/programs'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return programs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const program = findProgram(slug)
  return program ? pageMetadata(program.title, `Explore the planned ${program.title.toLowerCase()} program at Shepherds Not Sheep. Direct services are in development.`, `/programs/${slug}`) : { title: 'Program not found', robots: { index: false } }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = findProgram(slug)
  if (!program) notFound()
  return <>
    <BreadcrumbData items={[{ name: 'Home', path: '/' }, { name: 'Our Programs', path: '/programs' }, { name: program.title, path: `/programs/${slug}` }]} />
    <PageHero eyebrow="Planned program · Not yet operating" title={program.title} description={program.description} image={program.image} />
    <section className="py-16 sm:py-20"><Container><nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted-foreground"><Link href="/programs" className="underline underline-offset-4">All planned programs</Link><span aria-hidden="true"> / </span><span>{program.title}</span></nav><div className="grid gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="The intention" title="A practical part of a bigger mission." /><p className="mt-6 text-base leading-8 text-muted-foreground">{program.overview}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Imagery represents the intended program model, not currently operating SNS services or participants.</p></div><div><h2 className="text-2xl text-navy">What we are working toward</h2><ul className="mt-6 flex list-disc flex-col gap-4 pl-5 text-base leading-8 text-muted-foreground">{program.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul><Alert className="mt-8" role="note"><Info aria-hidden="true" /><AlertTitle>Direct services are in development</AlertTitle><AlertDescription>Contacting SNS does not guarantee housing, assistance, enrollment, or placement. For help today, use the official resources directory.</AlertDescription></Alert></div></div><div className="mt-12 flex flex-wrap gap-4"><ButtonLink href={`/veteran-resources?category=${encodeURIComponent(program.resourceCategory)}`}>Find current resources</ButtonLink><ButtonLink href="/get-involved#involvement-form" variant="outline">Help build this program</ButtonLink></div></Container></section>
    <CrisisBlock />
  </>
}
