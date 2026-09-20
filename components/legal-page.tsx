import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Container, PageHero } from '@/components/site-sections'

export const legalLastUpdated = 'September 15, 2026'

export type LegalSection = {
  title: string
  children: ReactNode
}

export function createLegalMetadata(title: string, description: string): Metadata {
  return { title, description }
}

export function LegalPage({ eyebrow, title, description, notice, sections, children }: { eyebrow: string; title: string; description: string; notice?: string; sections: LegalSection[]; children?: ReactNode }) {
  return <>
    <PageHero eyebrow={eyebrow} title={title} description={description} accent="navy" />
    <main className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-3 border-b border-navy/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-olive">Legal &amp; Policies</p>
            <p className="text-sm text-charcoal/60">Last Updated: {legalLastUpdated}</p>
          </div>
          {notice && <div className="mt-8 border-l-4 border-red bg-white px-5 py-4 text-sm leading-7 text-charcoal/75 sm:px-6"><strong className="font-semibold text-navy">Notice: </strong>{notice}</div>}
          <div className="mt-10 flex flex-col gap-10">
            {sections.map((section) => <section key={section.title} className="border-t border-navy/15 pt-7"><h2 className="text-2xl font-semibold tracking-[-0.03em] text-navy sm:text-3xl">{section.title}</h2><div className="mt-4 flex flex-col gap-4 text-base leading-8 text-charcoal/75">{section.children}</div></section>)}
          </div>
          {children}
        </div>
      </Container>
    </main>
  </>
}

export function LegalList({ items }: { items: string[] }) {
  return <ul className="flex flex-col gap-3 pl-5 marker:text-olive">{items.map((item) => <li key={item} className="pl-2">{item}</li>)}</ul>
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="font-semibold text-olive underline decoration-red underline-offset-4 hover:text-navy">{children}</a>
}
