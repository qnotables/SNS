'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navigation = [
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

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/sns-logo.png" alt="Shepherds Not Sheep logo" className="size-14 shrink-0 object-contain" />
          <span className="min-w-0 leading-tight">
            <span className="block whitespace-nowrap text-sm font-bold uppercase tracking-[0.16em] text-navy">Shepherds Not Sheep</span>
            <span className="hidden whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-charcoal/65 sm:block">Retreat &amp; Reestablishment Community</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 2xl:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-[11px] font-semibold uppercase tracking-[0.11em] text-charcoal transition-colors hover:text-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-4">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button render={<a href="/veteran-assistance" />} nativeButton={false} className="hidden bg-red text-cream hover:bg-red/90 sm:inline-flex" size="lg">Get Help</Button>
          <Button variant="outline" size="icon" className="border-navy/20 text-navy 2xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-navy/10 bg-cream px-5 py-5 sm:px-8 2xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-navy/10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-navy last:border-0">
                {item.label}
              </Link>
            ))}
            <Button render={<a href="/veteran-assistance" />} nativeButton={false} className="mt-4 w-full bg-red text-cream hover:bg-red/90 sm:hidden">Get Help</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export { navigation }
