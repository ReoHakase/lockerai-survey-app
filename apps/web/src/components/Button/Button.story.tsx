import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'ボタン',
  },
};

export default meta;

export const Default: Story = {};

export const Pending: Story = {
  args: {
    pending: true,
  },
};
