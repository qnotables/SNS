import type { Metadata } from 'next'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Container, PageHero } from '@/components/site-sections'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { donations } from '@/lib/db/schema'

export const metadata: Metadata = { title: 'Donation dashboard' }

export default async function AdminDonationsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  if (session.user.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect('/')

  const rows = await db.select().from(donations).orderBy(desc(donations.createdAt)).limit(250)
  const paid = rows.filter((row) => row.status === 'paid')
  const total = paid.reduce((sum, row) => sum + row.amount, 0)

  return <><PageHero eyebrow="Private dashboard" title="Donation records." description="Stripe-confirmed donations appear here after the webhook is verified. No card details are stored in this dashboard." /><section className="bg-[#ebe6dc] py-12 sm:py-20"><Container><div className="grid gap-4 sm:grid-cols-3"><div className="border border-navy/15 bg-cream p-5"><p className="eyebrow text-olive">Confirmed total</p><p className="mt-3 text-3xl font-semibold text-navy">${(total / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p></div><div className="border border-navy/15 bg-cream p-5"><p className="eyebrow text-olive">Paid donations</p><p className="mt-3 text-3xl font-semibold text-navy">{paid.length}</p></div><div className="border border-navy/15 bg-cream p-5"><p className="eyebrow text-olive">All records</p><p className="mt-3 text-3xl font-semibold text-navy">{rows.length}</p></div></div><div className="mt-10 overflow-x-auto border border-navy/15 bg-cream"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-navy/15 bg-navy text-cream"><tr><th className="px-4 py-4 font-semibold">Date</th><th className="px-4 py-4 font-semibold">Donor</th><th className="px-4 py-4 font-semibold">Program</th><th className="px-4 py-4 font-semibold">Type</th><th className="px-4 py-4 font-semibold">Amount</th><th className="px-4 py-4 font-semibold">Status</th></tr></thead><tbody>{rows.length ? rows.map((row) => <tr key={row.id} className="border-b border-navy/10 last:border-0"><td className="px-4 py-4 text-charcoal/70">{row.createdAt.toLocaleDateString()}</td><td className="px-4 py-4"><div className="font-semibold text-navy">{row.donorName || 'Anonymous'}</div><div className="text-xs text-charcoal/55">{row.donorEmail}</div></td><td className="px-4 py-4 text-charcoal/70">{row.program || '—'}</td><td className="px-4 py-4 capitalize text-charcoal/70">{row.donationType}</td><td className="px-4 py-4 font-semibold text-navy">${(row.amount / 100).toFixed(2)}</td><td className="px-4 py-4"><span className="rounded-full border border-olive/30 bg-olive/10 px-3 py-1 text-xs font-bold capitalize text-olive">{row.status}</span></td></tr>) : <tr><td colSpan={6} className="px-4 py-12 text-center text-charcoal/60">No donation records yet.</td></tr>}</tbody></table></div></Container></section></>
}
