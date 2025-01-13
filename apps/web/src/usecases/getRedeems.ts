import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm';
import { db } from '../db';
import { redeemTable } from '@/db/schema';
import type { Email } from '@/states/atoms/email';

export const getRedeems = async (email: Email) => {
  const redeems = db
    .select({
      id: redeemTable.id,
      email: redeemTable.email,
      type: redeemTable.type,
      confirmedAt: redeemTable.confirmedAt,
      requestedAt: redeemTable.requestedAt,
    })
    .from(redeemTable)
    .where(eq(redeemTable.email, email))
    .orderBy(desc(redeemTable.requestedAt));
  return redeems;
};
