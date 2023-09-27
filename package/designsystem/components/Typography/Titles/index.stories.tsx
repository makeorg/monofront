import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Title, TitleTagType } from '.';
import { typography } from '../../../tokens/typography';

const meta: Meta<typeof Title> = {
  component: Title,
  argTypes: {
    font: {
      control: 'radio',
      options: typography.FontFamily,
      description: 'font family of the text',
    },
    size: {
      control: 'select',
      options: typography.FontSize.Title,
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
      options: TitleTagType,
      description: 'html tag type',
    },

    children: {
      control: 'text',
      description: 'string that will be rendered as child',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleComponent: Story = {
  args: {
    font: typography.FontFamily.Default as keyof typeof typography.FontFamily,
    size: typography.FontSize.Title
      .GrandeCouronne as keyof typeof typography.FontSize.Title,
    lineHeight: typography.LineHeight
      .l150 as keyof typeof typography.LineHeight,
    transform: typography.TextTransform
      .None as keyof typeof typography.TextTransform,
    decoration: typography.TextDecoration
      .None as keyof typeof typography.TextDecoration,
    tag: TitleTagType.h2 as keyof typeof TitleTagType,
    children: 'I am a title !',
  },
  render: args => {
    const { font, size, lineHeight, transform, decoration, tag, children } =
      args;

    return (
      <Title
        font={font}
        size={size}
        lineHeight={lineHeight}
        transform={transform}
        decoration={decoration}
        tag={tag}
      >
        {children}
      </Title>
    );
  },
};
