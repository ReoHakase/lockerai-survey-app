import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { redeemTable } from '@/db/schema';

export const confirmRedeem = async ({ id, secret }: { id: string; secret: string }) => {
  const [redeem] = await db
    .select()
    .from(redeemTable)
    .where(and(eq(redeemTable.id, id), eq(redeemTable.secret, secret)));
  if (!redeem) {
    return null;
  }
  if (redeem.confirmedAt) {
    return {
      isFirstConfirmation: false as const,
    };
  }
  const [updatedRedeem] = await db
    .update(redeemTable)
    .set({ confirmedAt: new Date() })
    .where(eq(redeemTable.id, redeem.id))
    .returning({
      id: redeemTable.id,
      confirmedAt: redeemTable.confirmedAt,
      requestedAt: redeemTable.requestedAt,
      email: redeemTable.email,
      type: redeemTable.type,
    });
  return {
    isFirstConfirmation: true as const,
    ...updatedRedeem,
  };
};
