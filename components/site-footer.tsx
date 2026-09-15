import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const footerNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Our Mission', href: '/our-mission' },
  { label: 'Programs', href: '/programs' },
  { label: 'Veteran Assistance', href: '/veteran-assistance' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Donate', href: '/donate' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_0.9fr_0.9fr]">
          <div>
            <div className="mb-6 flex items-center">
              <img src="/images/sns-logo.png" alt="Shepherds Not Sheep" className="h-20 w-64 shrink-0 object-contain object-center" />
            </div>
            <p className="max-w-sm text-xl font-medium leading-relaxed text-cream/90">Retreat and Reestablishment Community for Veterans</p>
            <p className="mt-6 max-w-sm text-sm leading-7 text-cream/60">Serving those who served. Building a path forward.</p>
          </div>
          <div>
            <p className="eyebrow text-cream/45">Explore</p>
            <nav className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3" aria-label="Footer navigation">
              {footerNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-cream/75 transition-colors hover:text-cream">{item.label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="eyebrow text-cream/45">Legal &amp; Policies</p>
            <nav className="mt-5 flex flex-col gap-3" aria-label="Legal and policies">
              <Link href="/privacy" className="text-sm text-cream/75 transition-colors hover:text-cream">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-cream/75 transition-colors hover:text-cream">Terms of Use</Link>
              <Link href="/accessibility" className="text-sm text-cream/75 transition-colors hover:text-cream">Accessibility</Link>
              <Link href="/donation-policy" className="text-sm text-cream/75 transition-colors hover:text-cream">Donation &amp; Refund Policy</Link>
            </nav>
          </div>
          <div>
            <p className="eyebrow text-cream/45">Stay connected</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-cream/65">Email and social channels are in development. For now, use our contact page to start a conversation.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cream underline decoration-red underline-offset-4 transition-colors hover:text-cream/75">Contact the team <ArrowUpRight aria-hidden="true" /></Link>
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
