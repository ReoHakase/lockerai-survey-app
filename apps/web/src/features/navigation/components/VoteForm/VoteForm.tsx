'use client';

import { useAtom } from 'jotai';
import { ChevronDown, Check } from 'lucide-react';
import Form from 'next/form';
import type { FormProps } from 'next/form';
import type { ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import { TimeSince } from '../TimeSince';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectIcon,
  SelectViewport,
  SelectPortal,
  SelectContent,
  SelectItemIndicator,
  SelectItemText,
  SelectItemDescription,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/components/Select';
import { emailAtom } from '@/states/atoms/email';

import { css, cx } from 'styled-system/css';

export type VoteFormProps = FormProps;

export const VoteForm = ({ className, ...props }: VoteFormProps): ReactNode => {
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
        htmlFor="authorization"
        className={css({
          alignSelf: 'start',
          fontWeight: 'bold',
        })}
      >
        遺失物を渡しても問題ないか投票する{' '}
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
      <Select name="authorization" required>
        <SelectTrigger aria-label="Language selector" className={css({ w: 'full' })}>
          <SelectValue placeholder="選択肢から選んでください" />
          <SelectIcon>
            <ChevronDown />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal data-testid="select-portal">
          <SelectContent position="popper" side="bottom" sideOffset={4}>
            <SelectViewport>
              <SelectItem value="grant">
                <SelectItemText>はい</SelectItemText>
                <SelectItemDescription>
                  説明文章を書いた人物が、遺失物の本当の持ち主だと思うので、遺失物を渡す
                </SelectItemDescription>
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
              <SelectItem value="deny">
                <SelectItemText>いいえ</SelectItemText>
                <SelectItemDescription>
                  説明文章を書いた人物は、遺失物の本当の持ち主でないと思うので、遺失物を渡さない
                </SelectItemDescription>
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
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
