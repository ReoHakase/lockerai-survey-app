import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { getAnnotationSurveyProgressByEmail, getVoteSurveyProgressByEmail } from './getSurveyProgress';
import { redeemTable } from '@/db/schema';
import { insertRedeemSchema } from '@/db/schema';
import { loops } from '@/email';
import type { Email } from '@/states/atoms/email';
import { baseUrl } from '@/utils/routes/baseUrl';

export const requestRedeem = async ({ email, type }: { email: Email; type: 'annotation' | 'vote' }) => {
  const { isRedeemable: isAnnotationRedeemable } = await getAnnotationSurveyProgressByEmail(email);
  const { isRedeemable: isVoteRedeemable } = await getVoteSurveyProgressByEmail(email);
  switch (type) {
    case 'annotation':
      if (!isAnnotationRedeemable) {
        throw new Error('謝礼の受け取り条件1(説明文章)を満たしていません');
      }
      break;
    case 'vote':
      if (!isVoteRedeemable) {
        throw new Error('謝礼の受け取り条件2(投票)を満たしていません');
      }
      break;
  }
  const secret = randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const columns = insertRedeemSchema.parse({
    email,
    type,
    secret,
    confirmedAt: null,
  });
  const [insertedRow] = await db
    .insert(redeemTable)
    .values(columns)
    .returning({ id: redeemTable.id, secret: redeemTable.secret });
  const redeemLink = new URL(`/redeem/${insertedRow.id}?secret=${insertedRow.secret}`, baseUrl).toString();
  const emailResponse = await loops.sendTransactionalEmail({
    transactionalId: 'cm4ppaszy00o7ah31tt9ymj91',
    email,
    dataVariables: {
      redeemLink,
    },
  });
  if (!emailResponse.success) {
    await db.delete(redeemTable).where(eq(redeemTable.id, insertedRow.id));
    throw new Error(`受け取りメールの送信に失敗しました。 ${JSON.stringify(emailResponse)}`);
  }
};
