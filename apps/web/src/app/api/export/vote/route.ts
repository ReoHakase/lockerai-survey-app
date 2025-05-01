import { desc } from 'drizzle-orm';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { voteTable } from '@/db/schema';
import { env } from '@/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const headerList = await headers();
  const secret = headerList.get('X-Secret');
  if (secret !== env.SECRET) {
    notFound();
  }
  const votes = await db.query.voteTable.findMany({
    orderBy: [desc(voteTable.createdAt)],
  });
  return Response.json(votes);
}
