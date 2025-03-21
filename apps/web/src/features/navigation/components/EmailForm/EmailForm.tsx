'use client';

import { useAtom } from 'jotai';
import Form from 'next/form';
import type { FormProps } from 'next/form';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { SubmitButton } from '@/components/Button';
import { Input } from '@/components/Input';
import { emailAtom } from '@/states/atoms/email';

import { css, cx } from 'styled-system/css';

export type EmailFormProps = FormProps & {
  submitButtonText?: string;
};

export const EmailForm = ({
  className,
  submitButtonText = 'アンケートを始める',
  ...props
}: EmailFormProps): ReactNode => {
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
      <SubmitButton
        className={css({
          mt: '2',
        })}
      >
        {submitButtonText} →
      </SubmitButton>
    </Form>
  );
};
