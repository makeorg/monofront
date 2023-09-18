import React, { FC } from 'react';
import { GridStyle } from './style';
import { gridContainerCol } from '../../../tokens/spacings';

export const GridColValues = {
  col1: gridContainerCol.Columns.col1,
  col2: gridContainerCol.Columns.col2,
  col3: gridContainerCol.Columns.col3,
  col2FirstLarge: gridContainerCol.Columns.col2FirstLarge,
  col2FirstSmall: gridContainerCol.Columns.col2FirstSmall,
} as const;

export const RowGapValues = {
  s: gridContainerCol.RowGap.s,
  m: gridContainerCol.RowGap.m,
} as const;

export const ColGapValues = {
  s: gridContainerCol.ColumnGap.s,
  m: gridContainerCol.ColumnGap.m,
} as const;

export const JustifyValues = {
  center: gridContainerCol.Justify.center,
  start: gridContainerCol.Justify.start,
  end: gridContainerCol.Justify.end,
  stretch: gridContainerCol.Justify.stretch,
} as const;

export const AlignValues = {
  center: gridContainerCol.Align.center,
  start: gridContainerCol.Align.start,
  end: gridContainerCol.Align.end,
  stretch: gridContainerCol.Align.stretch,
} as const;

type Props = {
  col: keyof typeof GridColValues;
  rowGap: keyof typeof RowGapValues;
  colGap: keyof typeof ColGapValues;
  justify: keyof typeof JustifyValues;
  align: keyof typeof AlignValues;
  children: string | JSX.Element | JSX.Element[];
};

export const Grid: FC<Props> = ({
  col,
  rowGap,
  colGap,
  justify,
  align,
  children,
}) => (
  <GridStyle
    col={col}
    rowGap={rowGap}
    colGap={colGap}
    justify={justify}
    align={align}
  >
    {children}
  </GridStyle>
);
