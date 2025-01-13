import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Textarea } from './Textarea';

type Story = StoryObj<typeof Textarea>;

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    placeholder: 'プレイスホルダー。\nあいうえお',
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
      description: 'The current value of the Textarea',
    },
  },
};

export default meta;

export const Default: Story = {};
