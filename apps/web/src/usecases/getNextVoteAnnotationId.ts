import { eq } from 'drizzle-orm';
import { db } from '../db';
import { annotationTable, voteTable } from '@/db/schema';
import type { Email } from '@/states/atoms/email';

const pickOneRandomly = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getNextVoteAnnotationId = async ({ email }: { email: Email }) => {
  const [targetAnnotations, doneVotes] = await Promise.all([
    db
      .select({ id: annotationTable.id })
      .from(annotationTable)
      .where(eq(annotationTable.annotator, 'data-augmentation')),
    db.select({ annotation: voteTable.annotation }).from(voteTable).where(eq(voteTable.email, email)),
  ]);

  if (targetAnnotations.length === 0) {
    return null;
  }

  const targetAnnotationIdSet = new Set(targetAnnotations.map((a) => a.id));
  const doneAnnotationIdSet = new Set(doneVotes.map((a) => a.annotation));

  const possibleAnnotationIdSet = targetAnnotationIdSet.difference(doneAnnotationIdSet);
  const possibleAnnotationIds = Array.from(possibleAnnotationIdSet);

  if (possibleAnnotationIds.length === 0) {
    return null;
  }

  const nextAnnotationId = pickOneRandomly(possibleAnnotationIds);
  return nextAnnotationId;
};
