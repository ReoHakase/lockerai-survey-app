'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx, css } from 'styled-system/css';

export type ButtonProps = ComponentPropsWithRef<'button'>;

export const Button = ({ className, ...props }: ButtonProps): ReactNode => {
  return (
    <button
      className={cx(
        css({
          pos: 'relative',
          transition: 'all',
          // transitionDuration: '200ms',
          fontFamily: 'heading',
          fontWeight: 'bold',
          px: '4',
          py: '2',
          gap: '1',
          direction: 'row',
          bg: 'keyplate.12',
          color: 'keyplate.1',
          rounded: 'full',
          shadow: 'xl',
          borderBottom: '2px solid',
          borderColor: 'keyplate.9',
          cursor: 'pointer',
          _hover: {
            bg: 'keyplate.11',
          },
          top: '0',
          _active: {
            top: '1',
          },
          _disabled: {
            bg: 'keyplate.11',
            cursor: 'not-allowed',
          },
        }),
        className,
      )}
      {...props}
    />
  );
};
