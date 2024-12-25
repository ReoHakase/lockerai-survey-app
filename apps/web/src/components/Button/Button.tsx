'use client';

import { Loader } from 'lucide-react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { cx, css } from 'styled-system/css';

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  pending?: boolean;
};

export const Button = ({ className, pending = false, disabled, children, ...props }: ButtonProps): ReactNode => {
  return (
    <button
      disabled={disabled || pending}
      className={cx(
        css({
          display: 'flex',
          flexDir: 'row',
          pos: 'relative',
          alignItems: 'center',
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
    >
      {children}
      {pending && (
        <Loader
          className={css({
            animation: 'spin',
            w: '4',
            h: '4',
          })}
        />
      )}
    </button>
  );
};

export type SubmitButtonProps = Omit<ButtonProps, 'pending' | 'type'>;

export const SubmitButton = ({ ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return <Button {...props} type="submit" pending={pending} />;
};
