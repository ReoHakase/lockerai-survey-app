'use client';

import { useAtom } from 'jotai';
import type { ComponentPropsWithRef } from 'react';
import { useEffect, useState } from 'react';
import { emailAtom } from '@/states/atoms/email';

export type CurrentUserEmailProps = ComponentPropsWithRef<'span'>;

export const CurrentUserEmail = (props: CurrentUserEmailProps) => {
  const [email] = useAtom(emailAtom);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // ハイドレーション中は何も表示しない
  if (!hydrated || !email) {
    return null;
  }

  return <span {...props}>{email}</span>;
};
