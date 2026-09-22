import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageHero } from '@/components/site-sections'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = { title: 'Create admin account' }

export default function SignUpPage() {
  return <><PageHero eyebrow="Private access" title="Create the admin account." description="Use the approved administrator email address. Only that address can access the donation dashboard." /><section className="bg-[#ebe6dc] py-16 sm:py-24"><Container className="max-w-xl"><AuthForm mode="sign-up" /><p className="mt-6 text-center text-sm text-charcoal/60">Already registered? <Link href="/sign-in" className="font-semibold text-navy underline underline-offset-4">Sign in.</Link></p></Container></section></>
}
