import Link from 'next/link'
import { Info } from 'lucide-react'
import { Container, PageHero } from '@/components/site-sections'
import { CrisisBlock } from '@/components/crisis-block'
import { ResourceDirectory } from '@/components/resource-directory'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('Veteran Resources', 'Find official veteran resources for benefits, housing, mental health, employment, education, financial assistance, families, and community support.', '/veteran-resources')

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams
  const value = (key: string) => typeof query[key] === 'string' ? query[key].slice(0, 120) : ''
  return <>
    <PageHero eyebrow="Veteran Resource Center" title="Find a place to start." description="Official resources for veterans, families, and the people who support them. Search by need, category, or service area." />
    <CrisisBlock />
    <section className="bg-secondary/40 py-14 sm:py-20"><Container><Alert className="mb-8" role="note"><Info aria-hidden="true" /><AlertTitle>Independent resources. No guaranteed eligibility.</AlertTitle><AlertDescription>These links lead to official providers, not active SNS programs or confirmed SNS partners. Contact the provider for current availability and eligibility. SNS is not affiliated with or endorsed by the U.S. government. For a non-urgent conversation, <Link href="/veteran-assistance">contact our team</Link>.</AlertDescription></Alert><ResourceDirectory filters={{ q: value('q'), category: value('category'), area: value('area') }} /></Container></section>
  </>
}
