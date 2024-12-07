import { GithubIcon, History, User } from 'lucide-react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Suspense } from 'react';
import { ThemeSelect } from '../ThemeSelect';
import { TopNavigationLink, TopNavigationLinkFallback } from '../TopNavigation';
import HeaderIconImage from './icon.png';
import { Image } from '@/components/Image';
import { Link } from '@/components/Link';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';

/**
 * リンクのテキストを表示するコンポーネントです。
 *
 * @param omittableSuffix - 省略可能な接尾辞の文字列
 * @param children - 必ず表示する文字列
 * @returns span 要素
 */
const LinkText = ({ omittableSuffix, children }: { omittableSuffix?: string; children: string }): ReactNode => {
  return (
    <span>
      {children}
      {omittableSuffix ? <span className={css({ smDown: { srOnly: true } })}>{omittableSuffix}</span> : null}
    </span>
  );
};

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

/**
 * ヘッダーを表すコンポーネントです。
 */
export const Header = ({ ...props }: HeaderProps): ReactNode => {
  return (
    <header
      className={flex({
        pos: 'sticky',
        w: '100%',
        h: 'fit-content',
        top: '0',
        left: '0',
        zIndex: '100',
        direction: 'row',
        justify: 'space-between',
        align: 'center',
        p: '4',
        gap: '6',
        lgDown: {
          mb: '16', // 下に突き出るナビゲーションバーの分だけ余白を取る
        },
      })}
      {...props}
    >
      <div
        className={flex({
          direction: 'row',
          justify: 'start',
          align: 'center',
          gap: '6',
        })}
      >
        <Link
          href="/"
          className={css({
            rounded: 'full',
            flexShrink: '0',
          })}
        >
          <Image
            src={HeaderIconImage}
            css={[
              {
                rounded: 'full',
                w: '12',
                h: '12',
                outlineColor: '#299764',
                outlineWidth: '2',
                outlineStyle: 'solid',
                outlineOffset: '2px',
                flexShrink: '0',
              },
            ]}
            alt="An Icon of ReoHakase"
            sizes="48px"
            placeholder="blur"
          />
        </Link>
        <p
          className={css({
            fontFamily: 'heading',
            fontWeight: 'bold',
            lineHeight: '1.25',
          })}
        >
          Locker.ai
          <br />
          アンケートアプリ
        </p>
      </div>
      <nav
        className={css({
          pos: 'absolute',
          w: 'fit-content',
          h: '12',
          top: '4',
          left: '0',
          right: '0',
          mx: 'auto',
          display: 'flex',
          rounded: 'xl',
          flexDir: 'row',
          bg: 'keyplate.a.3',
          p: '1',
          backdropFilter: 'blur(8px) saturate(130%)',
          lgDown: {
            maxW: 'calc(100% - 24px)',
            top: '20',
          },
        })}
      >
        <Suspense
          fallback={
            <>
              <TopNavigationLinkFallback href="/user">
                <User /> <LinkText>回答者情報</LinkText>
              </TopNavigationLinkFallback>
              <TopNavigationLinkFallback href="/history">
                <History /> <LinkText>回答履歴</LinkText>
              </TopNavigationLinkFallback>
            </>
          }
        >
          <TopNavigationLink href="/user">
            <User /> <LinkText>回答者情報</LinkText>
          </TopNavigationLink>
          <TopNavigationLink href="/history">
            <History /> <LinkText>回答履歴</LinkText>
          </TopNavigationLink>
        </Suspense>
      </nav>
      <div
        className={flex({
          direction: 'row',
          justify: 'end',
          align: 'center',
          grow: '1',
          gap: '2',
        })}
      >
        <ThemeSelect />
        <Link
          href="https://github.com/ashitano-dcon"
          external
          referrerPolicy="no-referrer"
          className={flex({
            fontFamily: 'heading',
            fontWeight: 'bold',
            px: '4',
            py: '2',
            smDown: {
              p: '3',
            },
            gap: '1',
            direction: 'row',
            align: 'center',
            bg: 'keyplate.12',
            color: 'keyplate.1',
            rounded: 'full',
          })}
        >
          <GithubIcon
            className={css({
              display: 'inline',
              w: '4',
              h: '4',
            })}
          />
          <span className={css({ smDown: { srOnly: true } })}>私たちについて</span>
        </Link>
      </div>
    </header>
  );
};
