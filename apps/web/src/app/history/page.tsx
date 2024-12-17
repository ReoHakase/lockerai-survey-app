import { ArrowDown } from 'lucide-react';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';
import HistoryDocs from '@/docs/history.mdx';

import { EmailForm } from '@/features/navigation/components/EmailForm/EmailForm';
import { History } from '@/features/navigation/components/History/History';
import { css } from 'styled-system/css';

type HistoryPageProps = {
  searchParams: Promise<{ email: string }>;
};

const Page = async ({ searchParams }: HistoryPageProps): Promise<ReactElement> => {
  const { email } = await searchParams;
  return (
    <main
      className={css({
        pb: '32',
        display: 'flex',
        w: 'full',
        maxW: '800px',
        flexDir: 'column',
        alignSelf: 'center',
        lineHeight: '1.8',
        gap: '6',
      })}
    >
      <div
        className={css({
          display: 'flex',
          w: 'full',
          maxW: '800px',
          flexDir: 'column',
          alignSelf: 'center',
        })}
      >
        <HistoryDocs />
      </div>
      <EmailForm action="" submitButtonText="履歴を調べる" />
      {email && <ArrowDown className={css({ alignSelf: 'center' })} />}
      {email && <History email={email} />}
    </main>
  );
};

export default Page;
