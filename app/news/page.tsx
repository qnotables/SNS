import { Newspaper } from 'lucide-react'
import { Container, PageHero, ButtonLink } from '@/components/site-sections'
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from '@/components/ui/empty'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('News & Updates', 'Follow the development of Shepherds Not Sheep and find factual organizational updates as they are published.', '/news')

export default function NewsPage() {
  return <>
    <PageHero eyebrow="News & Updates" title="Progress worth sharing." description="A place for verified organizational updates, program milestones, and community news as the mission develops." />
    <section className="py-16 sm:py-20"><Container><Empty className="border border-border bg-card py-16"><EmptyHeader><EmptyMedia variant="icon"><Newspaper aria-hidden="true" /></EmptyMedia><EmptyTitle>No articles published yet</EmptyTitle><EmptyDescription>We will publish updates when there is confirmed news to share. In the meantime, our transparency page explains our current status and what we are building.</EmptyDescription></EmptyHeader><EmptyContent><ButtonLink href="/transparency">See where we stand</ButtonLink><ButtonLink href="/get-involved" variant="outline">Get involved</ButtonLink></EmptyContent></Empty></Container></section>
  </>
}
