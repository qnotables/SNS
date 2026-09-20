import type { Metadata } from 'next'
import { LegalPage, LegalLink, createLegalMetadata } from '@/components/legal-page'

export const metadata: Metadata = createLegalMetadata('Accessibility Statement', 'Shepherds Not Sheep accessibility commitments and feedback process.')

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Accessibility" title="A website more people can use." description="Shepherds Not Sheep is committed to making this website accessible and easier to use for people with different abilities, devices, and assistive technologies." sections={[
    { title: 'Our commitment', children: <p>We aim to provide an inclusive website experience and to improve accessibility as the organization and website develop. Accessibility work is ongoing, and some areas may still need improvement.</p> },
    { title: 'How we build', children: <p>We use semantic HTML, readable structure, visible focus states, descriptive labels, alternative text where appropriate, keyboard-friendly navigation, responsive layouts, and reduced-motion considerations. We also intend to improve compatibility with common assistive technologies over time.</p> },
    { title: 'Report an accessibility problem', children: <><p>If you encounter a barrier, please describe the page, the problem, the device or assistive technology you were using, and a way to follow up if you would like a response.</p><p>Accessibility contact email: <strong className="font-semibold text-navy">[Accessibility email to be added]</strong></p><p>You may also use the <LegalLink href="/contact">contact page</LegalLink> while a dedicated accessibility email is being established.</p></> },
    { title: 'Ongoing improvement', children: <p>We welcome specific feedback and will use it to prioritize improvements. Because the organization is in development, response processes and accessibility documentation may be expanded or updated.</p> },
  ]} />
}
