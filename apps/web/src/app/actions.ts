'use server';

import { redirect } from 'next/navigation';
import { requestRedeem } from '@/usecases/requestRedeem';

export const redeemByAnnotation = async (formData: FormData) => {
  const submittedEmail = formData.get('email') as string;
  await requestRedeem({ email: submittedEmail, type: 'annotation' });
  redirect('/email-sent');
};

export const redeemByVote = async (formData: FormData) => {
  const submittedEmail = formData.get('email') as string;
  await requestRedeem({ email: submittedEmail, type: 'vote' });
  redirect('/email-sent');
};
