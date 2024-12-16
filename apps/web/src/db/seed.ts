import { seed } from 'drizzle-seed';
import * as schema from './schema';
import { db } from '.';

const main = async () => {
  await seed(db, schema, { count: 20 }).refine((f) => ({
    annotationTable: {
      columns: {
        image: f.postcode(),
        description: f.loremIpsum({ sentencesCount: 5 }),
        duration: f.number({ minValue: 60, maxValue: 180 }),
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
