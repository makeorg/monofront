import React, { FC } from 'react';
import { GridStyle } from './style';
import { gridContainerCol } from '../../../tokens/spacings';

type Props = {
  col: keyof typeof gridContainerCol.Columns;
  rowGap: keyof typeof gridContainerCol.RowGap;
  colGap: keyof typeof gridContainerCol.ColumnGap;
  justify: keyof typeof gridContainerCol.Justify;
  align: keyof typeof gridContainerCol.Align;
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
