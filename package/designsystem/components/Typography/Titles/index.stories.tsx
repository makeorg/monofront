import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TitleLevelType, TitleSizeType, TitleStyleType, Title } from '.';

const meta: Meta<typeof Title> = {
  component: Title,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TitleSizeType),
      description: 'size of the title, from xxxl to xxxs',
    },
    type: {
      control: 'radio',
      options: Object.values(TitleStyleType),
      description: 'style of the title',
    },
    level: {
      control: 'select',
      options: Object.values(TitleLevelType),
      description: 'level from h1 to h6',
    },
    label: {
      control: 'text',
      description: 'string that will be rendered as child',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const TitleComponent: Story = {
  args: {
    size: TitleSizeType.m,
    level: TitleLevelType.h2,
    type: TitleStyleType.default,
    label: 'I am a title !',
  },
  render: args => {
    const { size, level, type, label } = args;

    return <Title size={size} level={level} type={type} label={label} />;
  },
};
