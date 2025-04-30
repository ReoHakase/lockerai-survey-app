import { desc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { voteTable, annotationTable } from '@/db/schema';
import { env } from '@/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const headerList = await headers();
  const secret = headerList.get('X-Secret');
  if (secret !== env.SECRET) {
    notFound();
  }
  const votes = await db
    .select({ vote: voteTable, annotation: annotationTable })
    .from(voteTable)
    .innerJoin(annotationTable, eq(voteTable.annotation, annotationTable.id))
    .orderBy(desc(voteTable.createdAt));
  return Response.json(votes);
}
