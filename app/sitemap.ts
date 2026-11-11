import type { MetadataRoute } from 'next'
import { programs } from '@/lib/programs'
import { siteUrl } from '@/lib/seo'

export const publicPaths = ['/', '/about', '/our-story', '/our-mission', '/leadership', '/programs', '/veteran-resources', '/veteran-assistance', '/get-involved', '/news', '/contact', '/donate', '/transparency', '/privacy', '/terms', '/accessibility', '/donation-policy', ...programs.map((program) => `/programs/${program.slug}`)]

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: path === '/news' ? 'monthly' : 'yearly', priority: path === '/' ? 1 : ['/veteran-resources', '/donate', '/programs'].includes(path) ? 0.8 : 0.5 }))
}
