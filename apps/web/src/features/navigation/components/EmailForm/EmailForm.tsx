'use client';

import { useAtom } from 'jotai';
import Form from 'next/form';
import type { FormProps } from 'next/form';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { emailAtom } from '@/states/atoms/email';

import { css } from 'styled-system/css';

export type EmailFormProps = FormProps;

export const EmailForm = ({ ...props }: EmailFormProps): ReactNode => {
  const [email, setEmail] = useAtom(emailAtom);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form
      ref={formRef}
      onSubmit={() => {
        if (!formRef.current) return;
        const submittedEmail = new FormData(formRef.current).get('email') as string;
        setEmail(submittedEmail);
      }}
      className={css({
        my: '2',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        gap: '2',
      })}
      {...props}
    >
      <label
        htmlFor="email"
        className={css({
          alignSelf: 'start',
          fontWeight: 'bold',
        })}
      >
        メールアドレス{' '}
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
      <Input
        id="email"
        name="email"
        type="email"
        required
        placeholder="st*****xx@gm.ibaraki-ct.ac.jp"
        defaultValue={email || undefined}
      />
      <Button
        type="submit"
        className={css({
          mt: '2',
        })}
      >
        アンケートを始める →
      </Button>
    </Form>
  );
};
