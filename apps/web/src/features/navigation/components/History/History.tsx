import { Wallet, MessageCircleDashed, Vote } from 'lucide-react';
import Form from 'next/form';
import type { ReactElement } from 'react';
import { redeemByAnnotation, redeemByVote } from '@/app/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Email } from '@/states/atoms/email';
import { getRedeems } from '@/usecases/getRedeems';
import { getAnnotationSurveyProgressByEmail, getVoteSurveyProgressByEmail } from '@/usecases/getSurveyProgress';
import { css } from 'styled-system/css';
import { markupHeading } from 'styled-system/recipes';

export type HistoryProps = {
  email: Email;
};

export const History = async ({ email }: HistoryProps): Promise<ReactElement> => {
  const [
    { annotation, quickAnnotation, isRedeemable: isRedeemableByAnnotaion },
    { vote, isRedeemable: isRedeemableByVote },
    redeems,
  ] = await Promise.all([
    getAnnotationSurveyProgressByEmail(email),
    getVoteSurveyProgressByEmail(email),
    getRedeems(email),
  ]);

  return (
    <div
      className={css({
        display: 'flex',
        w: 'full',
        flexDir: 'column',
        alignSelf: 'center',
        gap: '6',
      })}
    >
      <h3 className={markupHeading({ level: 'h3' })}>回答の履歴</h3>
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
          <Form action={redeemByAnnotation}>
            <Input name="email" type="email" value={email} readOnly className={css({ display: 'none' })} />
            <Button disabled={!isRedeemableByAnnotaion}>🎁 条件1でモンスターエナジーを受け取る →</Button>
          </Form>
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
          <Form action={redeemByVote}>
            <Input name="email" type="email" value={email} readOnly className={css({ display: 'none' })} />
            <Button disabled={!isRedeemableByVote}>🎁 条件2でモンスターエナジーを受け取る →</Button>
          </Form>
        </li>
      </ul>
      <h3 className={markupHeading({ level: 'h3' })}>受け取り履歴</h3>
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
        {redeems.map(({ id, type, confirmedAt, requestedAt }) => (
          <li
            key={id}
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
              {type === 'annotation' && (
                <>
                  <Wallet
                    className={css({
                      color: 'amber.11',
                    })}
                  />
                  <MessageCircleDashed
                    className={css({
                      color: 'crimson.11',
                    })}
                  />
                  条件1 (遺失物の説明文章を書く)
                </>
              )}
              {type === 'vote' && (
                <>
                  <Vote
                    className={css({
                      color: 'green.11',
                    })}
                  />
                  条件2 (説明文章が遺失物を正しく説明しているか投票する)
                </>
              )}
            </span>
            <span
              className={css({
                fontSize: 'sm',
                fontWeight: 'bold',
                color: 'keyplate.11',
              })}
            >
              {confirmedAt
                ? `${new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'full', timeStyle: 'long' }).format(confirmedAt)} に受け取り済み`
                : '未受け取り - 新着メールを確認してください'}
              <br />
              {`${new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'full', timeStyle: 'long' }).format(requestedAt)} に申し込み済み`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
