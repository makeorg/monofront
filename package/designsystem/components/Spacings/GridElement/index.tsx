import React, { FC } from 'react';
import { GridElementStyle } from './style';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const GridElement: FC<Props> = ({ children }) => (
  <GridElementStyle>{children}</GridElementStyle>
);
