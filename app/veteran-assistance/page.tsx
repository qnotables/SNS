import type { Metadata } from 'next'
import { CheckCircle2, Info } from 'lucide-react'
import { Container, Eyebrow } from '@/components/site-sections'
import { CrisisBlock } from '@/components/crisis-block'
import { AssistanceForm } from '@/components/site-forms'

export const metadata: Metadata = {
  title: 'Get Help',
  description: 'Reach Shepherds Not Sheep for veteran support. In a crisis, call 988 and press 1. For non-urgent help, send us a message and we will respond within 2 business days.',
}

const canHelpWith = [
  'Pointing you toward VA benefits and community resources',
  'Listening and helping you think through next steps',
  'Connecting you with mentors and partner organizations as we grow',
]

const cannotYet = [
  'Emergency shelter or same-day housing',
  'Licensed medical, psychiatric, or clinical care',
  'Financial assistance or guaranteed placement',
]

export default function VeteranAssistancePage() {
  const contactEmail = process.env.CONTACT_TO_EMAIL || null

  return (
    <>
      <section className="border-b border-navy/10 bg-navy py-16 text-cream sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow light>Get help</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">You reached out. That is the hardest part.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              Shepherds Not Sheep is being built to help veterans find footing again. We are early, and we will be honest with you about what we can and cannot do today.
            </p>
          </div>
        </Container>
      </section>

      <CrisisBlock />

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>What to expect</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-navy sm:text-4xl">Honest about where we are.</h2>
              <p className="mt-5 text-base leading-8 text-charcoal/70">
                We are an organization in formation. Sending this form starts a conversation with a real person — it is not an intake into a housing or benefits program.
              </p>

              <div className="mt-8 space-y-3">
                {canHelpWith.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-olive" aria-hidden="true" />
                    <p className="text-sm leading-7 text-charcoal/75">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-sm border border-navy/15 bg-[#f4f0e8] p-5">
                <div className="flex items-center gap-2">
                  <Info className="size-4 shrink-0 text-navy" aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy">What we cannot provide yet</p>
                </div>
                <ul className="mt-3 space-y-2">
                  {cannotYet.map((item) => (
                    <li key={item} className="text-sm leading-7 text-charcoal/65">— {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-sm border border-navy/15 bg-white p-6 shadow-[0_16px_40px_rgba(23,41,54,0.07)] sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-navy">Tell us how we can help</h2>
              <p className="mt-2 text-sm leading-7 text-charcoal/60">{'We read messages within 2 business days.'}</p>
              <div className="mt-7">
                <AssistanceForm contactEmail={contactEmail} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
