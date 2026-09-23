import type { Metadata } from 'next'
import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Container, PageHero } from '@/components/site-sections'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { receivedEmails } from '@/lib/db/schema'

export const metadata: Metadata = { title: 'Email inbox' }

export default async function AdminEmailInboxPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  if (session.user.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect('/')

  const emails = await db.select().from(receivedEmails).orderBy(desc(receivedEmails.receivedAt)).limit(200)

  return <><PageHero eyebrow="Private dashboard" title="Email inbox." description="Inbound messages delivered to your verified Resend receiving domain." /><section className="bg-[#ebe6dc] py-12 sm:py-20"><Container><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-charcoal/70">{emails.length} received messages</p><Link href="/admin/email/compose" className="bg-navy px-4 py-2 text-sm font-semibold text-cream hover:bg-navy/90">Compose email</Link></div><div className="grid gap-5">{emails.length ? emails.map((email) => <article key={email.id} className="border border-navy/15 bg-cream p-6"><div className="flex flex-wrap justify-between gap-3 border-b border-navy/10 pb-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-olive">{email.fromEmail}</p><h2 className="mt-2 font-display text-2xl text-navy">{email.subject}</h2><p className="mt-2 text-sm text-charcoal/60">To: {email.toEmails}{email.ccEmails ? ` · CC: ${email.ccEmails}` : ''}</p></div><time className="text-sm text-charcoal/60">{email.receivedAt.toLocaleString()}</time></div><div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-charcoal">{email.textBody || 'This message has no plain-text body.'}</div>{email.htmlBody ? <details className="mt-5 border-t border-navy/10 pt-4"><summary className="cursor-pointer text-sm font-semibold text-navy">View HTML source</summary><pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap bg-navy p-4 text-xs text-cream">{email.htmlBody}</pre></details> : null}</article>) : <div className="border border-navy/15 bg-cream p-12 text-center text-charcoal/60">No received emails yet.</div>}</div></Container></section></>
}
