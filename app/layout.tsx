import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Shepherds Not Sheep | A Path Forward for Veterans',
    template: '%s | Shepherds Not Sheep',
  },
  description: 'Supporting veterans through faith, service, and community.',
  openGraph: {
    title: 'Shepherds Not Sheep | A Path Forward for Veterans',
    description: 'Supporting veterans through faith, service, and community.',
    url: 'https://shepherdsnotsheep.org',
    siteName: 'Shepherds Not Sheep',
    images: [
      {
        url: 'https://shepherdsnotsheep.org/og/sns-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shepherds Not Sheep',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shepherds Not Sheep | A Path Forward for Veterans',
    description: 'Supporting veterans through faith, service, and community.',
    images: ['https://shepherdsnotsheep.org/og/sns-og-image.jpg'],
  },
  metadataBase: new URL('https://shepherdsnotsheep.org'),
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f0e8',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><SiteHeader /><main>{children}</main><SiteFooter />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
