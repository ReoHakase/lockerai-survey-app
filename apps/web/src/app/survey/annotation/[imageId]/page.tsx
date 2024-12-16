import type { StaticImageData } from 'next/image';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';
import { Image } from '@/components/Image';
import AnnotationDocs from '@/docs/annotation.mdx';
import { AnnotationForm } from '@/features/navigation/components/AnnotationForm/AnnotaionForm';
import { validateImageId, getLabel } from '@/items';
import { createAnnotation } from '@/usecases/createAnnotation';
import { css } from 'styled-system/css';

type AnnotationPageProps = {
  params: Promise<{ imageId: string }>;
};

const AnnotationPage = async ({ params }: AnnotationPageProps): Promise<ReactElement> => {
  const { imageId } = await params;
  if (!validateImageId(imageId)) {
    notFound();
  }
  const { label } = getLabel(imageId);
  const image = (await import(`../../../../../public/data/images/${imageId}.jpg`)).default as StaticImageData;

  const insertResult = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const inquiry = formData.get('inquiry') as string;
    const startsAt = new Date(formData.get('starts-at') as string);
    const endsAt = new Date();
    const duration = (endsAt.getTime() - startsAt.getTime()) / 1000;
    const quick = false;
    await createAnnotation({ imageId, label, email, inquiry, duration, quick });
    redirect('/');
  };

  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flexDir: 'column',
        gap: '12',
        lg: {
          flexDir: 'row',
        },
      })}
    >
      <div
        className={css({
          flex: '1',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'stretch',
          gap: '6',
        })}
      >
        <Image src={image} alt={label} placeholder="blur" />
        <AnnotationForm action={insertResult} />
      </div>
      <div
        className={css({
          flex: '1',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '2',
          lg: {
            p: '6',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '2xl',
          },
        })}
      >
        <div className="markup_div markdown-alert markdown-alert-tip">
          回答画面上部の画像に対して、下部の入力欄に説明文章を書いてください。
          その後、入力欄の下にある「回答を完了して送信」ボタンを押してください。
        </div>
        <AnnotationDocs />
      </div>
    </main>
  );
};

export default AnnotationPage;

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = 86400; // 24時間
