import type { Metadata } from 'next'
import { Mail, Clock } from 'lucide-react'
import { Container, Eyebrow } from '@/components/site-sections'
import { CrisisBlock } from '@/components/crisis-block'
import { ContactForm } from '@/components/site-forms'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Shepherds Not Sheep. Send us a message and we will respond within 2 business days. In a crisis, call 988 and press 1.',
}

export default function ContactPage() {
  const contactEmail = process.env.CONTACT_TO_EMAIL || null

  return (
    <>
      <section className="border-b border-navy/10 bg-cream py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-navy sm:text-5xl lg:text-6xl">Start a conversation.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal/70">Questions, partnerships, or just getting in touch — we would love to hear from you.</p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-olive/30 bg-olive/10 text-olive"><Clock className="size-5" aria-hidden="true" /></span>
                <div>
                  <h2 className="font-semibold text-navy">Response time</h2>
                  <p className="mt-1 text-sm leading-7 text-charcoal/65">We read messages within 2 business days.</p>
                </div>
              </div>
              {contactEmail ? (
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-olive/30 bg-olive/10 text-olive"><Mail className="size-5" aria-hidden="true" /></span>
                  <div>
                    <h2 className="font-semibold text-navy">Email</h2>
                    <a href={`mailto:${contactEmail}`} className="mt-1 inline-block text-sm font-semibold text-navy underline decoration-olive underline-offset-4 hover:text-olive">{contactEmail}</a>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="rounded-sm border border-navy/15 bg-white p-6 shadow-[0_16px_40px_rgba(23,41,54,0.07)] sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-navy">Send a message</h2>
              <div className="mt-7">
                <ContactForm contactEmail={contactEmail} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CrisisBlock />
    </>
  )
}
