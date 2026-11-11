import { CrisisBlock } from '@/components/crisis-block'
import { HomeHero, HomeMission, HomePrograms, HomePathway, HomeInvolvement, HomeTrust } from '@/components/home-sections'
import { homeDescription, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('Home', homeDescription, '/')

export default function HomePage() {
  return <>
    <HomeHero />
    <HomeMission />
    <HomePrograms />
    <HomePathway />
    <HomeInvolvement />
    <CrisisBlock />
    <HomeTrust />
  </>
}
