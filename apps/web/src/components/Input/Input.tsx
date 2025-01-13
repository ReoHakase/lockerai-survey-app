'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx, css } from 'styled-system/css';

export type InputProps = ComponentPropsWithRef<'input'>;

export const Input = ({ className, ...props }: InputProps): ReactNode => {
  return (
    <input
      className={cx(
        css({
          pos: 'relative',
          display: 'flex',
          h: '10',
          w: 'full',
          rounded: 'lg',
          border: '1px solid',
          borderColor: 'keyplate.6',
          bg: 'keyplate.2',
          px: '3',
          py: '2',
          ringOffset: '1',
          _focusVisible: {
            ringColor: 'keyplate.9',
          },
          color: 'keyplate.12',
          _placeholder: {
            color: 'keyplate.11',
          },
          _disabled: {
            cursor: 'not-allowed',
          },
          _invalid: {
            borderColor: 'error.6',
            bg: 'error.2',
            _focusVisible: {
              ringColor: 'error.9',
            },
            _after: {
              content: "'⚠️'",
              pos: 'absolute',
              right: '0',
              top: '0',
              bottom: '0',
              display: 'flex',
              alignItems: 'center',
              p: '0 2',
              color: 'error.9',
            },
          },
          _valid: {
            _focusVisible: {
              ringColor: 'success.9',
            },
          },
        }),
        className,
      )}
      {...props}
    />
  );
};
