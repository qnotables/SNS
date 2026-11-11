'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { programs } from '@/lib/programs'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', children: [
    { label: 'About the organization', href: '/about' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Mission & Values', href: '/our-mission' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Transparency', href: '/transparency' },
  ] },
  { label: 'Our Programs', href: '/programs', children: [
    { label: 'All planned programs', href: '/programs' },
    ...programs.map((program) => ({ label: program.title, href: `/programs/${program.slug}` })),
  ] },
  { label: 'Veteran Resources', href: '/veteran-resources' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  function closeMenus() {
    setOpen(false)
    header.current?.querySelectorAll('details[open]').forEach((element) => element.removeAttribute('open'))
  }

  function isCurrent(href: string) {
    return pathname === href
  }

  return <header ref={header} className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md" onKeyDown={(event) => {
    if (event.key !== 'Escape') return
    const disclosure = (event.target as HTMLElement).closest('details')
    if (disclosure?.open) {
      disclosure.open = false
      disclosure.querySelector('summary')?.focus()
    } else if (open) {
      closeMenus()
      menuButton.current?.focus()
    }
  }}>
    <div className="mx-auto flex min-h-24 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
      <Link href="/" onClick={closeMenus} className="shrink-0" aria-label="Shepherds Not Sheep home">
        <Image src="/images/sns-logo.png" alt="Shepherds Not Sheep" width={288} height={90} priority sizes="(min-width: 640px) 200px, 152px" className="h-16 w-28 object-contain sm:w-44" />
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:flex">
        {navigation.map((item) => item.children ? <details key={item.href} className="group relative" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
        }}>
          <summary className="flex min-h-12 list-none items-center gap-1 text-[13px] font-semibold text-foreground hover:text-olive [&::-webkit-details-marker]:hidden">{item.label}<ChevronDown className="size-3.5 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
          <div className="absolute left-0 top-full min-w-64 rounded-sm border border-border bg-popover p-2 shadow-xl">
            {item.children.map((child) => <Link key={child.href} href={child.href} onClick={closeMenus} aria-current={isCurrent(child.href) ? 'page' : undefined} className="flex min-h-11 items-center rounded-sm px-3 py-2 text-sm text-foreground hover:bg-muted aria-[current=page]:bg-muted">{child.label}</Link>)}
          </div>
        </details> : <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined} className="flex min-h-12 items-center text-[13px] font-semibold text-foreground underline-offset-8 hover:underline aria-[current=page]:underline">{item.label}</Link>)}
      </nav>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link href="/donate" onClick={closeMenus} className="hidden min-h-11 items-center justify-center rounded-sm border border-primary px-4 text-sm font-semibold text-primary min-[360px]:inline-flex">Donate</Link>
        <Link href="/veteran-assistance" onClick={closeMenus} className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-3 text-sm font-semibold text-primary-foreground sm:px-4">Get Help</Link>
        <Button ref={menuButton} type="button" variant="outline" size="icon-lg" className="size-11 xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
      </div>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="max-h-[75dvh] overflow-y-auto border-t border-border bg-background px-5 py-4 xl:hidden">
      {navigation.map((item) => <div key={item.href} className="border-b border-border">
        <Link href={item.href} onClick={closeMenus} aria-current={isCurrent(item.href) ? 'page' : undefined} className="flex min-h-12 items-center py-3 font-semibold text-foreground aria-[current=page]:underline">{item.label}</Link>
        {item.children && <div className="flex flex-col border-l border-border pl-4">{item.children.map((child) => <Link key={child.href} href={child.href} onClick={closeMenus} aria-current={isCurrent(child.href) ? 'page' : undefined} className="py-3 text-sm text-muted-foreground aria-[current=page]:underline">{child.label}</Link>)}</div>}
      </div>)}
      <Link href="/donate" onClick={closeMenus} className="mt-4 flex min-h-12 items-center justify-center bg-primary px-5 font-semibold text-primary-foreground">Support Our Mission</Link>
    </nav>
  </header>
}

export { navigation }
