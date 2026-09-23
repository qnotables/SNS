import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { EmailComposer } from '@/components/admin/email-composer'
import { Container, PageHero } from '@/components/site-sections'
import { auth } from '@/lib/auth'

export const metadata: Metadata = { title: 'Compose email' }

export default async function AdminEmailComposePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  if (session.user.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect('/')

  const domain = process.env.RESEND_EMAIL_DOMAIN
  return <><PageHero eyebrow="Private dashboard" title="Compose an email." description="Send a one-off HTML or plain-text message to external recipients through Resend." /><section className="bg-[#ebe6dc] py-12 sm:py-20"><Container><div className="mb-6 flex flex-wrap gap-3"><Link href="/admin/email/inbox" className="border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-navy/5">Inbox</Link><Link href="/admin/inquiries" className="border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-navy/5">Inquiries</Link></div><EmailComposer defaultFrom={`contact@${domain || 'shepherdsnotsheep.org'}`} /></Container></section></>
}
