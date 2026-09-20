import type { Metadata } from 'next'
import { LegalList, LegalPage, LegalLink, createLegalMetadata } from '@/components/legal-page'

export const metadata: Metadata = createLegalMetadata('Donation and Refund Policy', 'The intended donation and refund framework for Shepherds Not Sheep while donation processing is in development.')

export default function DonationPolicyPage() {
  return <LegalPage eyebrow="Giving" title="A careful framework for future giving." description="This policy describes the intended approach to donations and refunds as Shepherds Not Sheep develops its programs and donation systems." notice="Donation processing is currently in development. This policy describes the intended framework and will be updated before live donations are accepted." sections={[
    { title: 'Future donation processing', children: <p>Donations may be accepted in the future through approved payment providers. When enabled, donation processing may be subject to the payment provider’s terms, privacy practices, fees, verification requirements, and other conditions.</p> },
    { title: 'Tax status', children: <p>Do not assume that a donation is tax-deductible. Shepherds Not Sheep does not make a tax-exempt or nonprofit status claim through this policy. Donors should consult a qualified tax professional about their circumstances and wait for confirmed information before relying on a tax treatment.</p> },
    { title: 'Recurring donations', children: <p>If recurring donations are enabled, donors may be able to cancel them through the payment provider or other instructions made available at the time of the donation. Cancellation timing may depend on the provider.</p> },
    { title: 'Refund requests', children: <><p>Refund requests will be reviewed individually. A refund is not guaranteed after funds have been committed or spent.</p><LegalList items={['Mistaken or duplicate donations may be considered for refund.', 'Please provide the donation date, amount, and transaction information when requesting review.', 'Payment-provider processing fees, timing, and procedures may affect how a refund is handled.']} /></> },
    { title: 'In-kind and restricted gifts', children: <><p>In-kind donations may have separate acceptance, safety, condition, storage, transportation, or scheduling rules. Acceptance is not guaranteed.</p><p>Donor-restricted gifts may be subject to program availability and the organization’s ability to honor the stated purpose. Details will be provided with any future giving instructions.</p></> },
    { title: 'Questions about a future donation', children: <p>For questions, please use the <LegalLink href="/contact">contact page</LegalLink>. Donation instructions, payment-provider details, and any refund process will be added before donations are accepted.</p> },
  ]} />
}
