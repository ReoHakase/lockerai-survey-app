'use client';

import { useEffect, useState, useCallback } from 'react';
import { TimeSince } from '../TimeSince';
import { Button } from '@/components/Button';
import { Image } from '@/components/Image';
import type { ImageProps } from '@/components/Image';
import { cx, css } from 'styled-system/css';

type DisplayState = 'before' | 'during' | 'after';

export type QuickImageProps = ImageProps;

export const QuickImage = ({ className, alt, ...props }: QuickImageProps) => {
  const [displayState, setDisplayState] = useState<DisplayState>('before');
  const [since, setSince] = useState<Date | null>(null);

  const handleStart = useCallback(() => {
    setDisplayState('during');
    setSince(new Date());
    // 10秒後に表示を切り替える
    setTimeout(() => {
      setDisplayState('after');
    }, 10000);
  }, [setDisplayState]);

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pos: 'relative',
          overflow: 'hidden',
        }),
        className,
      )}
    >
      <Image alt={alt} className={cx(displayState !== 'during' && css({ filter: 'auto', blur: '3xl' }))} {...props} />
      <div
        className={css({
          pos: 'absolute',
          inset: '0',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2',
        })}
      >
        {displayState === 'during' ? (
          <p
            className={css({
              mt: 'auto',
              mb: '1',
              py: '1',
              px: '2',
              bg: 'keyplate.a.11',
              color: 'keyplate.1',
              rounded: 'md',
              fontSize: 'sm',
            })}
          >
            <TimeSince since={since} /> 経過
          </p>
        ) : (
          <>
            <p
              className={css({
                py: '1',
                px: '2',
                bg: 'keyplate.a.11',
                color: 'keyplate.1',
                rounded: 'md',
              })}
            >
              画像は1回・10秒間のみ表示できます
            </p>
            <Button disabled={displayState !== 'before'} onClick={handleStart}>
              表示する
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
