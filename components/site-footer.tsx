import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CrisisBlock } from '@/components/crisis-block'

const footerNavigation = [
  { label: 'Get Help', href: '/veteran-assistance' },
  { label: 'Programs', href: '/programs' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Our Mission', href: '/our-mission' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  const contactEmail = process.env.CONTACT_TO_EMAIL || null
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <div>
            <div className="mb-6 flex items-center">
              <img src="/images/sns-logo-footer.png" alt="Shepherds Not Sheep" className="h-20 w-64 shrink-0 object-contain object-left" />
            </div>
            <p className="max-w-sm text-lg font-medium leading-relaxed text-cream/90">Helping homeless and distressed veterans rebuild stable, independent lives.</p>
            <p className="mt-5 text-sm leading-7 text-cream/55">Programs are in development. Organization in formation.</p>
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cream underline decoration-red underline-offset-4 transition-colors hover:text-cream/75">
                {contactEmail}
              </a>
            ) : null}
          </div>
          <div>
            <p className="eyebrow text-cream/45">Explore</p>
            <nav className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3" aria-label="Footer navigation">
              {footerNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-cream/75 transition-colors hover:text-cream">{item.label}</Link>
              ))}
            </nav>
            <p className="eyebrow mt-8 text-cream/45">Legal &amp; Policies</p>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Legal and policies">
              <Link href="/privacy" className="text-sm text-cream/75 transition-colors hover:text-cream">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-cream/75 transition-colors hover:text-cream">Terms of Use</Link>
              <Link href="/accessibility" className="text-sm text-cream/75 transition-colors hover:text-cream">Accessibility</Link>
              <Link href="/donation-policy" className="text-sm text-cream/75 transition-colors hover:text-cream">Donation &amp; Refund Policy</Link>
            </nav>
          </div>
          <div className="lg:col-span-2">
            <CrisisBlock variant="footer" />
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cream underline decoration-red underline-offset-4 transition-colors hover:text-cream/75">Contact the team <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Shepherds Not Sheep. Organization in development.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/transparency" className="hover:text-cream">Transparency</Link><Link href="/privacy" className="hover:text-cream">Privacy</Link><Link href="/terms" className="hover:text-cream">Terms</Link></div>
        </div>
      </div>
    </footer>
  )
}
