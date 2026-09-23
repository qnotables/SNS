import type { Metadata } from 'next'
import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { InquiryReplyForm } from '@/components/admin/inquiry-reply-form'
import { Container, PageHero } from '@/components/site-sections'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { inquiries } from '@/lib/db/schema'

export const metadata: Metadata = { title: 'Inquiry inbox' }

export default async function AdminInquiriesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  if (session.user.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect('/')

  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(500)

  return (
    <>
      <PageHero eyebrow="Private dashboard" title="Inquiry inbox." description="Contact, assistance, and get-involved submissions are stored securely in Neon." />
      <section className="bg-[#ebe6dc] py-12 sm:py-20">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-charcoal/70">{rows.length} recent submissions</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/email/inbox" className="border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-navy/5">Email inbox</Link>
              <Link href="/admin/email/compose" className="border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-navy/5">Compose email</Link>
              <Link href="/admin/donations" className="border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-navy/5">Donations</Link>
              <a href="/api/admin/inquiries.csv" className="bg-navy px-4 py-2 text-sm font-semibold text-cream hover:bg-navy/90">Export CSV</a>
            </div>
          </div>
          <div className="overflow-x-auto border border-navy/15 bg-cream">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="border-b border-navy/15 bg-navy text-cream"><tr><th className="px-4 py-4">Date</th><th className="px-4 py-4">Type</th><th className="px-4 py-4">Name</th><th className="px-4 py-4">Email</th><th className="px-4 py-4">Phone</th><th className="px-4 py-4">Topic</th><th className="px-4 py-4">Message</th><th className="px-4 py-4">Reply</th></tr></thead>
              <tbody>
                {rows.length ? rows.map((row) => <tr key={row.id} className="border-b border-navy/10 align-top last:border-0"><td className="whitespace-nowrap px-4 py-4 text-charcoal/70">{row.createdAt.toLocaleString()}</td><td className="px-4 py-4 capitalize text-charcoal/70">{row.inquiryType}</td><td className="px-4 py-4 font-semibold text-navy">{row.name || 'Not provided'}</td><td className="px-4 py-4 text-charcoal/70">{row.email || '—'}</td><td className="px-4 py-4 text-charcoal/70">{row.phone || '—'}</td><td className="px-4 py-4 text-charcoal/70">{row.subject || row.need || row.role || '—'}</td><td className="max-w-[360px] whitespace-pre-wrap px-4 py-4 text-charcoal/80">{row.message}</td><td className="px-4 py-4">{row.email ? <InquiryReplyForm inquiryId={row.id} recipientEmail={row.email} defaultSubject={`Re: ${row.subject || row.need || row.role || 'Your inquiry'}`} /> : <span className="text-xs text-charcoal/50">No email</span>}</td></tr>) : <tr><td colSpan={8} className="px-4 py-12 text-center text-charcoal/60">No inquiries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  )
}
