import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageHero } from '@/components/site-sections'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = { title: 'Admin sign in' }

export default function SignInPage() {
  return <><PageHero eyebrow="Private access" title="Sign in." description="Authorized Shepherds Not Sheep administrators can sign in to review confirmed donations." /><section className="bg-[#ebe6dc] py-16 sm:py-24"><Container className="max-w-xl"><AuthForm mode="sign-in" /><p className="mt-6 text-center text-sm text-charcoal/60">Need the first account? <Link href="/sign-up" className="font-semibold text-navy underline underline-offset-4">Create it here.</Link></p></Container></section></>
}
