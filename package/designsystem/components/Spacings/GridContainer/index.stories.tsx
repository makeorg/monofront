import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid } from '.';
import { gridContainerCol } from '../../../tokens/spacings';
import { GridElement } from '../GridElement';

const meta: Meta<typeof Grid> = {
  component: Grid,
  argTypes: {
    col: {
      control: 'select',
      options: gridContainerCol.Columns,
      description: 'grid type',
    },
    rowGap: {
      control: 'select',
      options: gridContainerCol.RowGap,
      description: 'grid row gap type',
    },
    colGap: {
      control: 'select',
      options: gridContainerCol.ColumnGap,
      description: 'grid col gap type',
    },
    justify: {
      control: 'select',
      options: gridContainerCol.Justify,
      description: 'grid justify type',
    },
    align: {
      control: 'select',
      options: gridContainerCol.Align,
      description: 'grid align type',
    },
    children: {
      control: 'text',
      description: 'Grid elements',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const GridContainer: Story = {
  args: {
    col: gridContainerCol.Columns.col1 as keyof typeof gridContainerCol.Columns,
    rowGap: gridContainerCol.RowGap.s as keyof typeof gridContainerCol.RowGap,
    colGap: gridContainerCol.ColumnGap
      .s as keyof typeof gridContainerCol.ColumnGap,
    justify: gridContainerCol.Justify
      .center as keyof typeof gridContainerCol.Justify,
    align: gridContainerCol.Align.center as keyof typeof gridContainerCol.Align,
  },
  render: args => {
    const { col, rowGap, colGap, justify, align } = args;

    return (
      <Grid
        col={col}
        rowGap={rowGap}
        colGap={colGap}
        justify={justify}
        align={align}
      >
        <GridElement>test1</GridElement>
        <GridElement>test2</GridElement>
        <GridElement>test3</GridElement>
        <GridElement>test1</GridElement>
        <GridElement>test2</GridElement>
        <GridElement>test3</GridElement>
      </Grid>
    );
  },
};
