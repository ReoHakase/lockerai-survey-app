import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import GetStartedDocs from '@/docs/get-started.mdx';
import QuickAnnotationDocs from '@/docs/quick-annotation.mdx';
import { EmailForm } from '@/features/navigation/components/EmailForm/EmailForm';
import { getNextAnnotationImageId } from '@/usecases/getNextAnnotationImageId';

import { css } from 'styled-system/css';

const Page = async (): Promise<ReactNode> => {
  const startSurvey = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const imageId = await getNextAnnotationImageId({ email });
    redirect(`/survey/quick-annotation/${imageId}`);
  };
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
      })}
    >
      <QuickAnnotationDocs />
      <GetStartedDocs />
      <EmailForm action={startSurvey} />
    </main>
  );
};

export default Page;
