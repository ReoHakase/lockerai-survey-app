import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { Aurora } from '@/features/decoration/components/Aurora';
import { Header } from '@/features/navigation/components/Header';
import { AppProvider } from '@/providers';
import { fontVariables } from '@/styles/fonts';
import { baseUrl } from '@/utils/routes/baseUrl';
import { css } from 'styled-system/css';
import '@/styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  // `next-themes`プロバイダによるHydration差分を無視するため`suppressHydrationWarning`を付加する
  // 参照: https://github.com/pacocoursey/next-themes/issues/152
  // 参照: https://github.com/khinshankhan/next-themes-app-dir-example
  <html lang="ja" suppressHydrationWarning className={fontVariables}>
    <head />
    <body
      className={css({
        display: 'flex',
        minH: '100svh',
        flexDir: 'column',
        bg: 'keyplate.1',
        color: 'keyplate.12',
        overflowX: 'hidden',
      })}
    >
      {/* Refer: https://vercel.com/docs/concepts/analytics/quickstart */}
      <Analytics />
      <AppProvider>
        <Header />
        <div
          className={css({
            w: 'full',
            display: 'flex',
            flexDir: 'column',
            lg: {
              flexDir: 'row-reverse',
            },
            justifyContent: 'start',
            alignItems: 'start',
          })}
        >
          <div
            className={css({
              pos: 'relative',
              zIndex: '1',
              w: 'full',
              display: 'flex',
              flexDir: 'column',
              p: '6',
              flexGrow: '3',
              minH: 'calc(100svh - token(sizes.20))',
            })}
          >
            {children}
          </div>
        </div>
        <Aurora />
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;

export const defaultTitle = 'Locker.ai 遺失物データセット用 アンケートアプリ' as const;
export const defaultDescription =
  'DCON 2025の茨城高専チーム「明日のDCON楽しみだね」によるプロダクト「Locker.ai」の遺失物データセットを構築するためのアンケート用Webアプリです。' as const;

export const metadata: Metadata = {
  metadataBase: baseUrl,

  title: {
    default: defaultTitle,
    template: '%s | Locker.ai アンケート',
  },
  description: defaultDescription,
  openGraph: {
    // Open graph image will be provided via file-based configuration.
    // Refer: https://beta.nextjs.org/docs/api-reference/metadata#static-images
    type: 'website',
    locale: 'ja-JP',
    title: defaultTitle,
    description: defaultDescription,
    siteName: defaultTitle,
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = false; // 再生成なし
