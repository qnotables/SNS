'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '')
    const password = String(data.get('password') || '')
    const name = String(data.get('name') || '')
    const result = mode === 'sign-in'
      ? await authClient.signIn.email({ email, password })
      : await authClient.signUp.email({ email, password, name })
    setPending(false)
    if (result.error) {
      console.error('[v0] Authentication failed', result.error)
      setError('We could not verify those details. Please try again.')
      return
    }
    router.push('/admin/donations')
    router.refresh()
  }

  return <form onSubmit={submit} className="space-y-5 border border-navy/15 bg-cream p-6 shadow-[0_16px_40px_rgba(23,41,54,0.08)] sm:p-8">
    {mode === 'sign-up' && <div><label htmlFor="name" className="field-label">Name</label><input id="name" name="name" className="field-control" autoComplete="name" required /></div>}
    <div><label htmlFor="email" className="field-label">Email</label><input id="email" name="email" type="email" className="field-control" autoComplete="email" required /></div>
    <div><label htmlFor="password" className="field-label">Password</label><input id="password" name="password" type="password" minLength={8} className="field-control" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} required /></div>
    {error && <p role="alert" className="border border-red/30 bg-red/5 p-3 text-sm leading-6 text-red">{error}</p>}
    <button type="submit" disabled={pending} className="w-full bg-navy px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-cream hover:bg-navy/90 disabled:opacity-60">{pending ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</button>
  </form>
}
