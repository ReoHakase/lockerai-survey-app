import { db } from '../db';
import { voteTable } from '@/db/schema';
import { insertVoteSchema } from '@/db/schema';
import type { InsertVote } from '@/db/schema';

export const createVote = async (unsafeColumns: InsertVote) => {
  const columns = insertVoteSchema.parse(unsafeColumns);
  await db.insert(voteTable).values(columns);
};
