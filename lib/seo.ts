import type { Metadata } from 'next'

export const siteUrl = 'https://www.shepherdsnotsheep.org'
export const siteName = 'Shepherds Not Sheep'
export const socialImage = `${siteUrl}/og/sns-og-image.jpg`
export const homeDescription = 'Shepherds Not Sheep is a veteran-led organization developing programs focused on housing stability, advocacy, education, employment, and community support.'

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = path === '/' ? 'Shepherds Not Sheep | Veteran Support & Resources' : `${title} | ${siteName}`
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: `${siteUrl}${path === '/' ? '/' : path}` },
    openGraph: { title: fullTitle, description, url: `${siteUrl}${path}`, siteName, type: 'website', images: [{ url: socialImage, width: 1200, height: 630, alt: siteName }] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [socialImage] },
  }
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
