import { eq, and, not } from 'drizzle-orm';
import { db } from '../db';
import { annotationTable } from '@/db/schema';
import type { Email } from '@/states/atoms/email';

const pickOneRandomly = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getNextVoteAnnotationId = async ({ email }: { email: Email }) => {
  const possibleAnnotations = await db
    .select({ id: annotationTable.id })
    .from(annotationTable)
    .where(and(not(eq(annotationTable.email, email)), eq(annotationTable.annotator, 'human')));
  if (possibleAnnotations.length === 0) {
    return null;
  }
  const possibleAnnotationIds = possibleAnnotations.map((a) => a.id);
  console.info('possibleAnnotationIds', possibleAnnotationIds.length);
  const nextAnnotationId = pickOneRandomly(possibleAnnotationIds);
  return nextAnnotationId;
};
