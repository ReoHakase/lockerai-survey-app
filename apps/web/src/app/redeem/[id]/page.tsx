import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import RedeemAlreadyConfirmedDocs from '@/docs/redeem-already-confirmed.mdx';
import RedeemConfirmedDocs from '@/docs/redeem-confirmed.mdx';

import { confirmRedeem } from '@/usecases/confirmRedeem';
import { css } from 'styled-system/css';

type RedeemPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ secret: string }>;
};

const Page = async ({ params, searchParams }: RedeemPageProps): Promise<ReactElement> => {
  const [{ id }, { secret }] = await Promise.all([params, searchParams]);
  const confiemedRedeem = await confirmRedeem({ id, secret });
  if (!confiemedRedeem) {
    notFound();
  }
  const { isFirstConfirmation } = confiemedRedeem;
  return (
    <main
      className={css({
        pb: '32',
        display: 'flex',
        w: 'full',
        maxW: '800px',
        flexDir: 'column',
        alignSelf: 'center',
      })}
    >
      {isFirstConfirmation ? <RedeemConfirmedDocs /> : <RedeemAlreadyConfirmedDocs />}
    </main>
  );
};

export default Page;
