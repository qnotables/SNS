import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { inquiries } from '@/lib/db/schema'

function csvCell(value: unknown) {
  const text = value instanceof Date ? value.toISOString() : String(value ?? '')
  return `"${text.replace(/"/g, '""')}"`
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(5000)
  const columns = ['id', 'created_at', 'inquiry_type', 'name', 'email', 'phone', 'city', 'subject', 'need', 'role', 'skills', 'availability', 'heard_from', 'message'] as const
  const csv = [columns.join(','), ...rows.map((row) => [row.id, row.createdAt, row.inquiryType, row.name, row.email, row.phone, row.city, row.subject, row.need, row.role, row.skills, row.availability, row.heardFrom, row.message].map(csvCell).join(','))].join('\r\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
