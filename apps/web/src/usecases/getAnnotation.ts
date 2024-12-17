import { eq } from 'drizzle-orm';
import { db } from '../db';
import { annotationTable } from '@/db/schema';

export const getAnnotation = async ({ id }: { id: string }) => {
  const annotations = await db.select().from(annotationTable).where(eq(annotationTable.id, id));
  if (!annotations) {
    return null;
  }
  return annotations[0];
};
