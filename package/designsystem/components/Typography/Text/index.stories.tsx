import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextSizeType, TextStyleType, TextTagType, TextBody } from '.';

const meta: Meta<typeof TextBody> = {
  component: TextBody,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TextSizeType),
      description: 'size of the text',
    },
    tag: {
      control: 'select',
      options: Object.values(TextTagType),
      description: 'html tag type',
    },
    type: {
      control: 'select',
      options: Object.values(TextStyleType),
      description: 'style of the text',
    },
    label: {
      control: 'text',
      description: 'string that will be rendered as child',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextBody>;

export const TextComponent: Story = {
  args: {
    size: TextSizeType.m,
    tag: TextTagType.p,
    type: TextStyleType.default,
    label: 'I am a body text !',
  },
  render: args => {
    const { size, tag, type, label } = args;

    return <TextBody size={size} tag={tag} type={type} label={label} />;
  },
};
