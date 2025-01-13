import { db } from '../db';
import { annotationTable } from '@/db/schema';
import { insertAnnotationSchema } from '@/db/schema';
import type { InsertAnnotation } from '@/db/schema';

export const createAnnotation = async (unsafeColumns: InsertAnnotation) => {
  const columns = insertAnnotationSchema.parse(unsafeColumns);
  await db.insert(annotationTable).values(columns);
};
