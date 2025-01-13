import { reset } from 'drizzle-seed';
import * as schema from './schema';
import { db } from '.';

const main = async () => {
  await reset(db, schema);
};

main();
