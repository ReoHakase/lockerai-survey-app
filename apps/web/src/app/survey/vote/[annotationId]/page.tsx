import type { StaticImageData } from 'next/image';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';
import { Image } from '@/components/Image';
import { Textarea } from '@/components/Textarea';
import VoteDocs from '@/docs/vote.mdx';
import { VoteForm } from '@/features/navigation/components/VoteForm/VoteForm';
import { createVote } from '@/usecases/createVote';
import { getAnnotation } from '@/usecases/getAnnotation';
import { css } from 'styled-system/css';
import { markupHeading } from 'styled-system/recipes';

type VotePageProps = {
  params: Promise<{ annotationId: string }>;
};

const VotePage = async ({ params }: VotePageProps): Promise<ReactElement> => {
  const { annotationId } = await params;
  const annotation = await getAnnotation({ id: annotationId });
  if (!annotation) {
    notFound();
  }
  const { imageId, label, inquiry, latency } = annotation;
  const image = (await import(`../../../../../public/data/images/${imageId}.webp`)).default as StaticImageData;

  const insertResult = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const authorization = formData.get('authorization') as 'grant' | 'deny';
    const startsAt = new Date(formData.get('starts-at') as string);
    const endsAt = new Date();
    const duration = (endsAt.getTime() - startsAt.getTime()) / 1000;
    await createVote({ email, annotation: annotationId, duration, authorization });
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
          gap: '2',
        })}
      >
        <h2 className={markupHeading({ level: 'h3' })}>分類: {label}</h2>
        <Image src={image} alt={label} placeholder="blur" />
        <label
          htmlFor="inquiry"
          className={css({
            alignSelf: 'start',
            fontWeight: 'bold',
          })}
        >
          説明文章{' '}
          <span
            className={css({
              fontSize: 'sm',
              p: '1',
              bg: 'info.11',
              color: 'info.1',
            })}
          >
            投票対象
          </span>
        </label>
        <Textarea id="inquiry" name="inquiry" placeholder="ここに説明文章を入力してください" value={inquiry} readOnly />
        <label
          htmlFor="latency"
          className={css({
            alignSelf: 'start',
            fontWeight: 'bold',
          })}
        >
          主張された紛失日時と実際の誤差{' '}
          <span
            className={css({
              fontSize: 'sm',
              p: '1',
              bg: 'info.11',
              color: 'info.1',
            })}
          >
            投票対象
          </span>
        </label>
        <p
          id="latency"
          className={css({
            bg: 'keyplate.a.2',
            rounded: 'md',
            py: '2',
            px: '4',
          })}
        >
          {latency > 0
            ? `遺失物を引き取るために説明文章の書き主が主張している紛失日時は、実際の紛失日時の ${Math.abs(latency)} 日後でした。`
            : `遺失物を引き取るために説明文章の書き主が主張している紛失日時は、実際の紛失日時の ${Math.abs(latency)} 日前でした。`}
        </p>
        <VoteForm action={insertResult} />
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
          回答画面上部の画像と説明文章に対して、遺失物(落とし物)を受け渡してもいい正しい申請かどうかを、投票してください。
          その後、入力欄の下にある「回答を完了して送信」ボタンを押してください。
        </div>
        <VoteDocs />
      </div>
    </main>
  );
};

export default VotePage;

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = 86400; // 24時間
