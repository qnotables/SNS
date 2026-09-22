import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'
import { donations } from '@/lib/db/schema'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const payload = await request.text()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    console.error('[v0] Stripe webhook signature verification failed', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session
    const donationId = session.metadata?.donationId
    if (donationId) {
      await db.update(donations).set({
        status: session.payment_status === 'paid' ? 'paid' : 'pending',
        stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
        stripeSubscriptionId: typeof session.subscription === 'string' ? session.subscription : null,
        updatedAt: new Date(),
      }).where(eq(donations.id, donationId))
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    const donationId = session.metadata?.donationId
    if (donationId) await db.update(donations).set({ status: 'canceled', updatedAt: new Date() }).where(eq(donations.id, donationId))
  }

  return NextResponse.json({ received: true })
}
