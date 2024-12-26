import { eq } from 'drizzle-orm';
import { z } from 'zod';
import unsafeAiAnnotations from './ai-annotations.json'; // eslint-disable-line
import type { InsertAnnotation } from './schema';
import { insertAnnotationSchema, annotationTable } from './schema';
import { db } from '.';

const aiAnnotationsSchema = z.array(
  z.object({
    id: z.string(),
    imageId: z.string(),
    label: z.string(),
    latency: z.number(),
    inquiry: z.string(),
  }),
);

const main = async () => {
  const aiAnnotations = aiAnnotationsSchema.parse(unsafeAiAnnotations);
  const aiAnnotationRows = z.array(insertAnnotationSchema).parse(
    aiAnnotations.map(
      (cols): InsertAnnotation => ({
        ...cols,
        quick: false,
        annotator: 'ai',
      }),
    ),
  );

  const currentAiAnnotationCount = await db.$count(annotationTable, eq(annotationTable.annotator, 'ai'));
  if (currentAiAnnotationCount > 0) {
    throw new Error('AI annotations already exist');
  }

  await db.insert(annotationTable).values(aiAnnotationRows);
};

main();
