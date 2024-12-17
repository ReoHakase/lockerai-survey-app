import { desc } from 'drizzle-orm';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { redeemTable } from '@/db/schema';
import { env } from '@/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const headerList = await headers();
  const secret = headerList.get('X-Secret');
  if (secret !== env.SECRET) {
    notFound();
  }
  const redeems = await db.select().from(redeemTable).orderBy(desc(redeemTable.requestedAt));
  return Response.json(redeems);
}
