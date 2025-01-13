import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import AnnotationDocs from '@/docs/annotation.mdx';
import GetStartedDocs from '@/docs/get-started.mdx';
import { EmailForm } from '@/features/navigation/components/EmailForm/EmailForm';
import { getNextAnnotationImageId } from '@/usecases/getNextAnnotationImageId';

import { css } from 'styled-system/css';

const Page = async (): Promise<ReactNode> => {
  const startSurvey = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const imageId = await getNextAnnotationImageId({ email });
    redirect(`/survey/annotation/${imageId}`);
  };
  return (
    <div
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
      <AnnotationDocs />
      <GetStartedDocs />
      <EmailForm action={startSurvey} />
    </div>
  );
};

export default Page;
