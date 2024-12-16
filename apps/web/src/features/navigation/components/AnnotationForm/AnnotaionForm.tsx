'use client';

import { useAtom } from 'jotai';
import Form from 'next/form';
import type { FormProps } from 'next/form';
import type { ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import { TimeSince } from '../TimeSince';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { emailAtom } from '@/states/atoms/email';
import { timeStatsAtom } from '@/states/atoms/timeStats';

import { css, cx } from 'styled-system/css';

export type AnnotationFormProps = FormProps;

export const AnnotationForm = ({ className, ...props }: AnnotationFormProps): ReactNode => {
  const [email] = useAtom(emailAtom);
  const [startsAt, setStartsAt] = useState<Date | null>(null);

  useEffect(() => {
    setStartsAt(new Date());
  }, [setStartsAt]);

  return (
    <Form
      className={cx(
        css({
          my: '2',
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: '2',
        }),
        className,
      )}
      {...props}
    >
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
            bg: 'error.11',
            color: 'error.1',
          })}
        >
          必須
        </span>
      </label>
      <Textarea id="inquiry" name="inquiry" required placeholder="ここに説明文章を入力してください" autoFocus />
      <Input
        name="email"
        type="email"
        required
        value={email || ''}
        readOnly
        className={css({
          display: 'none',
        })}
      />
      <Input
        name="starts-at"
        type="text"
        value={startsAt?.toISOString() || ''}
        required
        readOnly
        className={css({
          display: 'none',
        })}
      />
      <Button
        type="submit"
        className={css({
          mt: '2',
        })}
      >
        回答を完了して送信 →
      </Button>
      <TimeSince since={startsAt} />
    </Form>
  );
};
