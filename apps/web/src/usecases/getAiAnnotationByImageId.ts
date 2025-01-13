import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { annotationTable } from '@/db/schema';

export const getAiAnnotationByImageId = async ({ imageId }: { imageId: string }) => {
  const annotations = await db
    .select()
    .from(annotationTable)
    .where(and(eq(annotationTable.imageId, imageId), eq(annotationTable.annotator, 'ai')))
    .limit(1);
  if (!annotations) {
    return null;
  }
  return annotations[0];
};
