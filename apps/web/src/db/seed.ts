import { seed } from 'drizzle-seed';
import * as schema from './schema';
import { db } from '.';
import { getImageIds } from '@/items';

const main = async () => {
  const imageIds = getImageIds();
  await seed(db, schema, { count: 20 }).refine((f) => ({
    annotationTable: {
      columns: {
        imageId: f.valuesFromArray({
          values: imageIds,
        }),
        inquiry: f.loremIpsum({ sentencesCount: 5 }),
        duration: f.number({ minValue: 60, maxValue: 180 }),
        latency: f.number({ minValue: -3, maxValue: 7 }),
        annotator: f.valuesFromArray({
          values: ['human'],
        }),
      },
    },
    voteTable: {
      columns: {
        duration: f.number({ minValue: 20, maxValue: 60 }),
      },
    },
  }));
};

main();
