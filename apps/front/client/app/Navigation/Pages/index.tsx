import React, { FC } from 'react';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { useLocation } from 'react-router';
import { PagesItemStyle, PagesLinkStyle } from './style';

export type PageNavigationType = {
  link: string;
  label: string;
  routeToMatch: string;
  onClickAction?: () => void;
};

type Props = {
  pages: PageNavigationType[];
};

export const InnerPagesNavigation: FC<Props> = ({ pages }) => {
  const { pathname } = useLocation();

  return (
    <nav>
      <UnstyledListStyle>
        {pages.map(page => (
          <PagesItemStyle key={page.link}>
            <PagesLinkStyle
              to={page.link}
              className={pathname === page.routeToMatch ? 'selected' : ''}
              onClick={page.onClickAction}
            >
              {page.label}
            </PagesLinkStyle>
          </PagesItemStyle>
        ))}
      </UnstyledListStyle>
    </nav>
  );
};
