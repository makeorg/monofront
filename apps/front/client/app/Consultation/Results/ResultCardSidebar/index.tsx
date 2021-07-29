import React, { FC } from 'react';
import {
  ResultCardSidebarStyle,
  ResultCardSidebarTitleStyle,
  ResultCardSidebarParagraphStyle,
} from './style';

type Props = {
  /** Title to render */
  title: string;
  /** Optional description to render */
  description: string;
  /** Children to render */
  children: Node | JSX.Element;
  /** Optional parameter to render for context display */
  isContext?: boolean;
};
export const ResultCardSidebar: FC<Props> = ({
  title,
  description,
  children,
  isContext = false,
}) => (
  <ResultCardSidebarStyle isContext={isContext}>
    <ResultCardSidebarTitleStyle
      data-cy-container={isContext ? 'context' : 'contact'}
    >
      {title}
    </ResultCardSidebarTitleStyle>
    <ResultCardSidebarParagraphStyle>
      {description}
    </ResultCardSidebarParagraphStyle>
    {children}
  </ResultCardSidebarStyle>
);
