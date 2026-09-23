import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

export const donations = pgTable('donations', {
  id: text('id').primaryKey(),
  stripeSessionId: text('stripe_session_id').unique(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  donorName: text('donor_name'),
  donorEmail: text('donor_email'),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('usd'),
  donationType: text('donation_type').notNull(),
  program: text('program'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const inquiries = pgTable('inquiries', {
  id: text('id').primaryKey(),
  inquiryType: text('inquiry_type').notNull(),
  name: text('name'),
  email: text('email'),
  phone: text('phone'),
  city: text('city'),
  subject: text('subject'),
  need: text('need'),
  role: text('role'),
  skills: text('skills'),
  availability: text('availability'),
  heardFrom: text('heard_from'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Donation = typeof donations.$inferSelect
export const inquiryReplies = pgTable('inquiry_replies', {
  id: text('id').primaryKey(),
  inquiryId: text('inquiry_id').notNull(),
  recipientEmail: text('recipient_email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('sent'),
  resendId: text('resend_id'),
  errorMessage: text('error_message'),
  sentAt: timestamp('sent_at', { withTimezone: true }).notNull().defaultNow(),
})

export const inquiryNotes = pgTable('inquiry_notes', {
  id: text('id').primaryKey(),
  inquiryId: text('inquiry_id').notNull(),
  note: text('note').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Inquiry = typeof inquiries.$inferSelect
export type InquiryNote = typeof inquiryNotes.$inferSelect
export const outboundEmails = pgTable('outbound_emails', {
  id: text('id').primaryKey(),
  resendId: text('resend_id').unique(),
  fromEmail: text('from_email').notNull(),
  toEmails: text('to_emails').notNull(),
  ccEmails: text('cc_emails'),
  subject: text('subject').notNull(),
  textBody: text('text_body'),
  htmlBody: text('html_body'),
  status: text('status').notNull().default('sent'),
  errorMessage: text('error_message'),
  sentAt: timestamp('sent_at', { withTimezone: true }).notNull().defaultNow(),
})

export const receivedEmails = pgTable('received_emails', {
  id: text('id').primaryKey(),
  resendId: text('resend_id').unique().notNull(),
  fromEmail: text('from_email').notNull(),
  toEmails: text('to_emails').notNull(),
  ccEmails: text('cc_emails'),
  subject: text('subject').notNull(),
  textBody: text('text_body'),
  htmlBody: text('html_body'),
  messageId: text('message_id'),
  receivedAt: timestamp('received_at', { withTimezone: true }).notNull().defaultNow(),
})

export type InquiryReply = typeof inquiryReplies.$inferSelect
export type OutboundEmail = typeof outboundEmails.$inferSelect
export type ReceivedEmail = typeof receivedEmails.$inferSelect
