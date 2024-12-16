import { ArrowDown, Wallet, MessageCircleDashed, Vote } from 'lucide-react';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';
import { Button } from '@/components/Button';
import HistoryDocs from '@/docs/history.mdx';

import { EmailForm } from '@/features/navigation/components/EmailForm/EmailForm';
import { Email } from '@/states/atoms/email';
import { getAnnotationSurveyProgressByEmail, getVoteSurveyProgressByEmail } from '@/usecases/getSurveyProgress';
import { css } from 'styled-system/css';

type HistoryProps = {
  email: Email;
};

const History = async ({ email }: HistoryProps): Promise<ReactElement> => {
  const [
    { annotation, quickAnnotation, isRedeemable: isRedeemableByAnnotaion },
    { vote, isRedeemable: isRedeemableByVote },
  ] = await Promise.all([getAnnotationSurveyProgressByEmail(email), getVoteSurveyProgressByEmail(email)]);
  return (
    <>
      <ul
        className={css({
          pos: 'relative',
          zIndex: '5',
          w: 'full',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'stretch',
          gap: '4',
        })}
      >
        <li
          className={css({
            px: '6',
            py: '4',
            gap: '2',
            display: 'flex',
            flexDir: 'column',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '3xl',
          })}
        >
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            })}
          >
            <Wallet
              className={css({
                color: 'amber.11',
              })}
            />
            遺失物の画像を見ながら、説明文章を書く
          </span>
          <span
            className={css({
              fontSize: 'sm',
              fontWeight: 'bold',
              color: 'keyplate.11',
            })}
          >
            あなたは累計で {annotation.total}件 回答済み ・ あと {annotation.redeemGoal - annotation.sinceLastRedeem} 件
            回答でプレゼント🎁
          </span>
        </li>
        <li
          className={css({
            px: '6',
            py: '4',
            gap: '2',
            display: 'flex',
            flexDir: 'column',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '3xl',
          })}
        >
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            })}
          >
            <MessageCircleDashed
              className={css({
                color: 'crimson.11',
              })}
            />
            遺失物の画像を10秒だけ見て、思い出しながら説明文章を書く
          </span>
          <span
            className={css({
              fontSize: 'sm',
              fontWeight: 'bold',
              color: 'keyplate.11',
            })}
          >
            あなたは累計で {quickAnnotation.total}件 回答済み ・ あと{' '}
            {quickAnnotation.redeemGoal - quickAnnotation.sinceLastRedeem} 件 回答でプレゼント🎁
          </span>
        </li>
        <li className={css({ alignSelf: 'end' })}>
          <Button disabled={!isRedeemableByAnnotaion}>🎁 条件1でモンスターエナジーを受け取る →</Button>
        </li>
      </ul>
      <ul
        className={css({
          pos: 'relative',
          zIndex: '5',
          w: 'full',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'stretch',
          gap: '4',
        })}
      >
        <li
          className={css({
            px: '6',
            py: '4',
            gap: '2',
            display: 'flex',
            flexDir: 'column',
            bg: 'keyplate.a.1',
            border: '1px solid',
            borderColor: 'keyplate.6',
            rounded: '3xl',
          })}
        >
          <span
            className={css({
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            })}
          >
            <Vote
              className={css({
                color: 'green.11',
              })}
            />
            説明文章が遺失物を正しく説明しているか投票する
          </span>
          <span
            className={css({
              fontSize: 'sm',
              fontWeight: 'bold',
              color: 'keyplate.11',
            })}
          >
            あなたは累計で {vote.total}件 回答済み ・ あと {vote.redeemGoal - vote.sinceLastRedeem} 件
            回答でプレゼント🎁
          </span>
        </li>
        <li className={css({ alignSelf: 'end' })}>
          <Button disabled={!isRedeemableByAnnotaion}>🎁 条件2でモンスターエナジーを受け取る →</Button>
        </li>
      </ul>
    </>
  );
};

type AnnotationPageProps = {
  searchParams: Promise<{ email: string }>;
};

const Page = async ({ searchParams }: AnnotationPageProps): Promise<ReactElement> => {
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
          gap: '2',
        })}
      >
        <HistoryDocs />
      </div>
      <EmailForm action="" />
      {email && <ArrowDown className={css({ alignSelf: 'center' })} />}
      {email && <History email={email} />}
    </main>
  );
};

export default Page;
