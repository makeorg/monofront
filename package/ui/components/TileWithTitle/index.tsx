import React, { FC } from 'react';
import { TileSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { TileWithTitleStyle, TileTitleStyle } from './style';

type Props = {
  /** Title of the tile */
  title: string;
  /** Chidlren to render */
  children: any;
  /** Optional icon as prop to render */
  icon?: any;
  /** Optional as for Tile */
  as?: any;
};

export const TileWithTitle: FC<Props> = ({ title, children, icon, as }) => (
  <TileWithTitleStyle as={as}>
    <TileTitleStyle as="h3">
      {icon}
      {title}
    </TileTitleStyle>
    <TileSeparatorStyle />
    {children}
  </TileWithTitleStyle>
);
