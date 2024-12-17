import type { ReactElement } from 'react';
import EmailSentDocs from '@/docs/email-sent.mdx';
import { css } from 'styled-system/css';

const Page = async (): Promise<ReactElement> => {
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
      <EmailSentDocs />
    </main>
  );
};

export default Page;
