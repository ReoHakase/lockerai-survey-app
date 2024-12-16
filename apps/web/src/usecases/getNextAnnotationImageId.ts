import { eq } from 'drizzle-orm';
import { db } from '../db';
import { annotationTable } from '@/db/schema';
import { getImageIds } from '@/items';
import type { Email } from '@/states/atoms/email';

const pickOneRandomly = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getNextAnnotationImageId = async ({ email }: { email: Email }) => {
  const doneAnnotations = await db
    .select({ imageId: annotationTable.imageId })
    .from(annotationTable)
    .where(eq(annotationTable.email, email));
  const doneImageIds = doneAnnotations.map((a) => a.imageId);
  const imageIds = getImageIds();
  const possibleImageIds = imageIds.filter((id) => !doneImageIds.includes(id));
  // pick a random imageId from possibleImageIds
  const nextImageId = possibleImageIds.length > 0 ? pickOneRandomly(possibleImageIds) : pickOneRandomly(imageIds);
  return nextImageId;
};
