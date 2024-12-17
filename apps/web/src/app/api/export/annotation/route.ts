import { desc } from 'drizzle-orm';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { annotationTable } from '@/db/schema';
import { env } from '@/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const headerList = await headers();
  const secret = headerList.get('X-Secret');
  if (secret !== env.SECRET) {
    notFound();
  }
  const annotations = await db.select().from(annotationTable).orderBy(desc(annotationTable.createdAt));
  return Response.json(annotations);
}
