import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Grid,
  GridColValues,
  RowGapValues,
  ColGapValues,
  JustifyValues,
  AlignValues,
} from '.';
import { GridElement } from '../GridElement';

const meta: Meta<typeof Grid> = {
  component: Grid,
  argTypes: {
    col: {
      control: 'select',
      options: GridColValues,
      description: 'grid type',
    },
    rowGap: {
      control: 'select',
      options: RowGapValues,
      description: 'grid row gap type',
    },
    colGap: {
      control: 'select',
      options: ColGapValues,
      description: 'grid col gap type',
    },
    justify: {
      control: 'select',
      options: JustifyValues,
      description: 'grid justify type',
    },
    align: {
      control: 'select',
      options: AlignValues,
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
    col: GridColValues.col1 as keyof typeof GridColValues,
    rowGap: RowGapValues.s as keyof typeof RowGapValues,
    colGap: ColGapValues.s as keyof typeof ColGapValues,
    justify: JustifyValues.center as keyof typeof JustifyValues,
    align: AlignValues.center as keyof typeof AlignValues,
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
