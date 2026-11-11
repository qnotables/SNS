import { homeDescription, safeJsonLd, siteName, siteUrl } from '@/lib/seo'

export function OrganizationData() {
  const data = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: siteName, url: siteUrl, description: homeDescription, logo: `${siteUrl}/images/sns-logo.png`, email: 'contact@shepherdsnotsheep.org', sameAs: ['https://facebook.com/profile.php?id=61595803334794'] },
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: siteName, url: siteUrl, publisher: { '@id': `${siteUrl}/#organization` } },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />
}

export function BreadcrumbData({ items }: { items: { name: string; path: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${siteUrl}${item.path}` })) }) }} />
}
