import { eq } from 'drizzle-orm';
import { z } from 'zod';
import unsafeAiAnnotations from './ai-annotations.json'; // eslint-disable-line
import type { InsertAnnotation } from './schema';
import { insertAnnotationSchema, annotationTable } from './schema';
import { db } from '.';

const aiAnnotationsSchema = z.object({
  labels: z.record(
    z.string(),
    z
      .array(
        z.object({
          label: z.string(),
          latency: z.number(),
          machineAnnotation: z.string(),
        }),
      )
      .length(1),
  ),
});

const main = async () => {
  const aiAnnotations = aiAnnotationsSchema.parse(unsafeAiAnnotations);
  const aiAnnotationRows = z.array(insertAnnotationSchema).parse(
    Object.entries(aiAnnotations.labels).map(
      ([imageId, [{ label, latency, machineAnnotation }]]): InsertAnnotation => ({
        imageId,
        label,
        latency,
        annotator: 'ai',
        inquiry: machineAnnotation,
        quick: false,
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
