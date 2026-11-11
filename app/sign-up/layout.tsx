import type { Metadata } from 'next'

export const metadata: Metadata = { robots: { index: false, follow: false }, alternates: { canonical: null } }

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children
}
