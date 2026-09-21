import { AlertTriangle, ExternalLink } from 'lucide-react'
import { Container } from '@/components/site-sections'

const lines = [
  { label: 'Emergencies', action: 'Call 911', href: 'tel:911', note: 'Immediate medical, fire, or police response' },
  { label: 'Veterans Crisis Line', action: 'Call 988, then press 1', href: 'tel:988', note: 'Free, confidential, 24/7 support' },
  { label: 'Crisis Line by text', action: 'Text 838255', href: 'sms:838255', note: 'Message a responder directly' },
]

const disclaimer =
  'Shepherds Not Sheep is not an emergency service and cannot provide immediate medical, police, or crisis intervention. If you are in danger right now, use the numbers above.'

export function CrisisBlock({ variant = 'full' }: { variant?: 'full' | 'compact' | 'footer' }) {
  if (variant === 'footer') {
    return (
      <div className="rounded-sm border border-red/40 bg-red/10 p-5">
        <div className="flex items-center gap-2 text-cream">
          <AlertTriangle className="size-4 shrink-0 text-red" aria-hidden="true" />
          <h2 className="text-sm font-bold uppercase tracking-[0.12em]">In immediate danger?</h2>
        </div>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-cream/85">
          {lines.map((line) => (
            <li key={line.label}>
              <a href={line.href} className="font-semibold text-cream underline decoration-red underline-offset-4 hover:text-cream/80">
                {line.action}
              </a>
              <span className="text-cream/60"> — {line.label}</span>
            </li>
          ))}
          <li>
            <a
              href="https://www.veteranscrisisline.net"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cream underline decoration-red underline-offset-4 hover:text-cream/80"
            >
              veteranscrisisline.net <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs leading-6 text-cream/55">{disclaimer}</p>
      </div>
    )
  }

  const inner = (
    <div className="rounded-sm border-2 border-red/50 bg-red/10 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <AlertTriangle className="size-6 shrink-0 text-red" aria-hidden="true" />
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-navy sm:text-2xl">If you are in immediate danger</h2>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {lines.map((line) => (
          <li key={line.label} className="flex flex-col rounded-sm border border-navy/15 bg-cream p-4">
            <span className="eyebrow text-olive">{line.label}</span>
            <a
              href={line.href}
              className="mt-2 text-lg font-semibold text-navy underline decoration-red decoration-2 underline-offset-4 hover:text-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2"
            >
              {line.action}
            </a>
            <span className="mt-1 text-xs leading-5 text-charcoal/60">{line.note}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://www.veteranscrisisline.net"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline decoration-red underline-offset-4 hover:text-red"
      >
        veteranscrisisline.net <ExternalLink className="size-4" aria-hidden="true" />
      </a>
      <p className="mt-5 text-sm leading-7 text-charcoal/70">{disclaimer}</p>
    </div>
  )

  if (variant === 'compact') return inner

  return (
    <section className="border-y border-red/20 bg-[#f4ece7] py-14 sm:py-16">
      <Container>{inner}</Container>
    </section>
  )
}
