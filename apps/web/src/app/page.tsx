import { ArrowRight, Wallet, MessageCircleDashed, Vote } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '@/components/Link';
import { getSurveyProgress } from '@/usecases/getSurveyProgress';
import { css } from 'styled-system/css';

const Home = async (): Promise<ReactNode> => {
  const { annotationCount, annotationCountGoal, quickAnnotationCount, quickAnnotationCountGoal, voteCount } =
    await getSurveyProgress();
  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        flexGrow: 1,
        flexDir: 'column',
        justifyContent: 'center',
        gap: '8',
        alignItems: 'center',
        lg: {
          minH: '80svh',
        },
      })}
    >
      <p
        className={css({
          maxW: '800px',
          textAlign: 'center',
          fontSize: 'lg',
        })}
      >
        <Link href="https://dcon.ai/" external referrerPolicy="no-referrer">
          DCON 2025
        </Link>{' '}
        の茨城高専チーム「明日のDCON楽しみだね」によるプロダクト「Locker.ai」の遺失物データセットを構築するためのアンケート用Webアプリです。
      </p>
      <nav
        className={css({
          pos: 'relative',
          zIndex: '5',
          w: 'full',
          maxW: '600px',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'stretch',
          gap: '4',
        })}
      >
        <Link
          href="/survey/annotation"
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
            transition: 'background-color 0.2s',
            _hover: {
              bg: 'keyplate.a.3',
            },
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
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'keyplate.11',
            })}
          >
            <span>
              与えられる画像の遺失物(落とし物)をあなたは見つけました。落とし物窓口に申告•説明するように、画像を見ながら詳細な説明文章を書いてください。
              <br />
              <span
                className={css({
                  fontSize: 'sm',
                  fontWeight: 'bold',
                })}
              >
                目標 {annotationCountGoal} 件に対して {annotationCount} 件の回答数 (
                {Math.round((annotationCount / annotationCountGoal) * 100)}%)
              </span>
            </span>
            <ArrowRight className={css({ flexShrink: 0 })} />
          </span>
        </Link>
        <Link
          href="/survey/quick-annotation"
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
            transition: 'background-color 0.2s',
            _hover: {
              bg: 'keyplate.a.3',
            },
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
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'keyplate.11',
            })}
          >
            <span>
              最初に10秒間だけ表示される画像の遺失物(落とし物)をあなたは見つけました。落とし物窓口に申告•説明するように、思い出しながら説明文章を書いてください。
              <br />
              <span
                className={css({
                  fontSize: 'sm',
                  fontWeight: 'bold',
                })}
              >
                目標 {quickAnnotationCountGoal} 件に対して {quickAnnotationCount} 件の回答数 (
                {Math.round((quickAnnotationCount / quickAnnotationCountGoal) * 100)}%)
              </span>
            </span>
            <ArrowRight className={css({ flexShrink: 0 })} />
          </span>
        </Link>
        <Link
          href="/survey/vote"
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
            transition: 'background-color 0.2s',
            _hover: {
              bg: 'keyplate.a.3',
            },
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
              display: 'flex',
              gap: '2',
              flexDir: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'keyplate.11',
            })}
          >
            <span>
              あなたは落とし物窓口の係員です。最初に、遺失物(落とし物)の画像と説明文章が与えられます。ただし、説明文章はあやふやだったり、落とし物を盗むために嘘をついているかもしれません。説明文章が、落とし物を正しく説明しているかを「はい」か「いいえ」で投票してください。
              <br />
              <span
                className={css({
                  fontSize: 'sm',
                  fontWeight: 'bold',
                })}
              >
                {voteCount} 件の回答数
              </span>
            </span>
            <ArrowRight className={css({ flexShrink: 0 })} />
          </span>
        </Link>
      </nav>
      <p
        className={css({
          textAlign: 'center',
          color: 'pink.11',
          fontWeight: 'bold',
          fontSize: 'sm',
        })}
      >
        🎁 協力してくれた方には、謝礼として「モンスターエナジー パイプラインパンチ 355mL缶」をプレゼント中！
      </p>
      <small
        className={css({
          fontSize: 'sm',
          color: 'keyplate.11',
        })}
      >
        このWebアプリは
        <Link href="https://github.com/ReoHakase" external referrerPolicy="no-referrer">
          白田連大 @ReoHakase
        </Link>
        により作成されました。
      </small>
    </main>
  );
};

export default Home;

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = 60; // 1分
