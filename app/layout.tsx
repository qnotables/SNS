import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { OrganizationData } from '@/components/structured-data'
import { homeDescription, pageMetadata, siteUrl } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  ...pageMetadata('Home', homeDescription, '/'),
  title: { default: 'Shepherds Not Sheep | Veteran Support & Resources', template: '%s | Shepherds Not Sheep' },
  metadataBase: new URL(siteUrl),
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#1d2119' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><a href="#main-content" className="skip-link">Skip to main content</a><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter /><OrganizationData />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
