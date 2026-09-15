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
  description: 'Shepherds Not Sheep is developing a retreat and reestablishment community to help veterans build stable, independent, and purposeful lives.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f0e8',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><SiteHeader /><main>{children}</main><SiteFooter />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
