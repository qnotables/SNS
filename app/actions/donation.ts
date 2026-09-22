'use server'

import { db } from '@/lib/db'
import { donations } from '@/lib/db/schema'
import { stripe } from '@/lib/stripe'

const MIN_AMOUNT = 5
const MAX_AMOUNT = 25000

function parseDonation(input: FormData) {
  const amount = Number(input.get('amount'))
  const type = input.get('donationType') === 'monthly' ? 'monthly' : 'one-time'
  const name = String(input.get('name') || '').trim().slice(0, 120)
  const email = String(input.get('email') || '').trim().toLowerCase().slice(0, 254)
  const program = String(input.get('program') || 'Where needed most').trim().slice(0, 120)

  if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    throw new Error(`Choose an amount between $${MIN_AMOUNT} and $${MAX_AMOUNT.toLocaleString()}.`)
  }
  if (!name || !email || !email.includes('@')) throw new Error('Enter your name and a valid email address.')

  return { amount, type, name, email, program }
}

export async function createDonationCheckout(input: FormData) {
  const donation = parseDonation(input)
  const donationId = crypto.randomUUID()
  const origin = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: donation.type === 'monthly' ? 'subscription' : 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: donation.type === 'monthly' ? 'Monthly donation' : 'One-time donation',
            description: `Shepherds Not Sheep — ${donation.program}`,
          },
          unit_amount: donation.amount * 100,
          ...(donation.type === 'monthly' ? { recurring: { interval: 'month' as const } } : {}),
        },
        quantity: 1,
      },
    ],
    customer_email: donation.email,
    metadata: {
      donationId,
      donorName: donation.name,
      donorEmail: donation.email,
      program: donation.program,
      donationType: donation.type,
    },
    success_url: `${origin}/donate?success=1`,
    cancel_url: `${origin}/donate?canceled=1`,
  })

  await db.insert(donations).values({
    id: donationId,
    stripeSessionId: session.id,
    donorName: donation.name,
    donorEmail: donation.email,
    amount: donation.amount * 100,
    currency: 'usd',
    donationType: donation.type,
    program: donation.program,
    status: 'pending',
  })

  return session.url
}
