import type { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { Container, Eyebrow, SectionHeading } from '@/components/site-sections'
import { InvolveForm } from '@/components/site-forms'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Volunteer, mentor, hire, donate gear, sponsor, or refer a veteran. Tell us how you would like to help build Shepherds Not Sheep.',
}

const roles = [
  { title: 'Volunteer', body: 'Give time to community projects, events, and day-to-day tasks as programs come online. We will match your availability to real needs.' },
  { title: 'Mentor a veteran', body: 'Share your experience one-on-one — career guidance, encouragement, or simply steady presence as a veteran rebuilds.' },
  { title: 'Hire or offer an internship', body: 'Open a door. Job shadowing, internships, and hiring create the momentum that makes independence stick.' },
  { title: 'Donate gear or materials', body: 'Tools, workshop equipment, vehicles, and supplies help us build hands-on training and stability programs.' },
  { title: 'Sponsor or partner', body: 'Organizations and businesses can help underwrite specific programs or bring resources and expertise to the table.' },
  { title: 'Refer a veteran', body: 'Know someone who could use support? Point them our way, or send us their situation so we can reach out.' },
]

export default function GetInvolvedPage() {
  const contactEmail = process.env.CONTACT_TO_EMAIL || null

  return (
    <>
      <section className="border-b border-navy/10 bg-cream py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Get involved</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-navy sm:text-5xl lg:text-6xl">Help us build this the right way.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal/70">There are many ways to support veterans through Shepherds Not Sheep. Tell us how you would like to help and we will follow up personally.</p>
          </div>
        </Container>
      </section>

      <section className="bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Ways to help" title="Find the fit that suits you." />
              <div className="mt-8 divide-y divide-navy/12 border-y border-navy/12">
                {roles.map((role) => (
                  <details key={role.title} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                      <span className="text-lg font-semibold text-navy">{role.title}</span>
                      <Plus className="size-5 shrink-0 text-olive transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                    </summary>
                    <p className="pb-5 text-sm leading-7 text-charcoal/70">{role.body}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-navy/15 bg-white p-6 shadow-[0_16px_40px_rgba(23,41,54,0.07)] sm:p-8 lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-navy">Tell us how you can help</h2>
              <p className="mt-2 text-sm leading-7 text-charcoal/60">{'We read messages within 2 business days.'}</p>
              <div className="mt-7">
                <InvolveForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
