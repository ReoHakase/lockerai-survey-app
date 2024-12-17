'use client';

import type { ComponentPropsWithRef } from 'react';
import { useEffect, useState } from 'react';

export type TimeSinceProps = ComponentPropsWithRef<'span'> & {
  since: Date | null; // 経過時間を計算する基準となる時刻
};

export const TimeSince = ({ since, ...props }: TimeSinceProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    setHydrated(true);

    const calculateElapsed = () => {
      if (!since) {
        setElapsedSeconds(0);
        return;
      }
      const now = new Date();
      const diff = Math.floor((now.getTime() - since.getTime()) / 1000); // 秒単位の差分
      setElapsedSeconds(diff);
    };

    calculateElapsed(); // 初回計算
    const interval = setInterval(calculateElapsed, 1000); // 1秒ごとに更新

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
  }, [since]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes > 0 ? `${minutes}分` : ''}${remainingSeconds}秒`;
  };

  if (!hydrated || !since) {
    return null; // ハイドレーション中は何も表示しない
  }

  return <span {...props}>{formatTime(elapsedSeconds)}</span>;
};
