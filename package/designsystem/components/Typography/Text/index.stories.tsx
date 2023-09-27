import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextBody, TextTagType } from '.';
import { typography } from '../../../tokens/typography';

const meta: Meta<typeof TextBody> = {
  component: TextBody,
  argTypes: {
    font: {
      control: 'radio',
      options: typography.FontFamily,
      description: 'font family of the text',
    },
    size: {
      control: 'select',
      options: typography.FontSize.Text,
      description: 'size of the text',
    },
    lineHeight: {
      control: 'select',
      options: typography.LineHeight,
      description: 'line-height of the text',
    },
    transform: {
      control: 'select',
      options: typography.TextTransform,
      description: 'case of the text (text-transform)',
    },
    decoration: {
      control: 'select',
      options: typography.TextDecoration,
      description: 'decoration of the text(text-decoration)',
    },
    tag: {
      control: 'select',
      options: TextTagType,
      description: 'html tag type',
    },

    children: {
      control: 'text',
      description: 'string that will be rendered as child',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextBody>;

export const TextComponent: Story = {
  args: {
    font: typography.FontFamily.Default as keyof typeof typography.FontFamily,
    size: typography.FontSize.Text
      .Bastille as keyof typeof typography.FontSize.Text,
    lineHeight: typography.LineHeight
      .l150 as keyof typeof typography.LineHeight,
    transform: typography.TextTransform
      .None as keyof typeof typography.TextTransform,
    decoration: typography.TextDecoration
      .None as keyof typeof typography.TextDecoration,
    tag: TextTagType.p as keyof typeof TextTagType,
    children: 'I am a body text !',
  },
  render: args => {
    const { font, size, lineHeight, transform, decoration, tag, children } =
      args;

    return (
      <TextBody
        font={font}
        size={size}
        lineHeight={lineHeight}
        transform={transform}
        decoration={decoration}
        tag={tag}
      >
        {children}
      </TextBody>
    );
  },
};
