import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from './Input';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    placeholder: 'プレイスホルダー',
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
      description: 'The current value of the Input',
    },
  },
};

export default meta;

export const Default: Story = {};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'st*******@gm.ibaraki-ct.ac.jp',
  },
};
