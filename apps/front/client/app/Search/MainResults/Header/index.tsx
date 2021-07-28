import React from 'react';
import i18n from 'i18next';
import { RedLinkRouterStyle } from '@make.org/ui/elements/LinkElements';
import {
  MainResultsHeaderStyle,
  MainResultsTitleStyle,
  MainResultsTitleWrapperStyle,
  MainResultsHeaderContentStyle,
} from './style';

type Props = {
  title: string;
  count: number;
  link: string;
};

export const MainResultsHeader: React.FC<Props> = ({ title, count, link }) => (
  <MainResultsHeaderStyle>
    <MainResultsHeaderContentStyle>
      <MainResultsTitleWrapperStyle>
        <MainResultsTitleStyle as="span">{title}</MainResultsTitleStyle>
        {i18n.t('search.main_results.results', { count })}
      </MainResultsTitleWrapperStyle>
      {count > 4 && (
        <RedLinkRouterStyle to={link}>
          {i18n.t('search.main_results.view_all')}
        </RedLinkRouterStyle>
      )}
    </MainResultsHeaderContentStyle>
  </MainResultsHeaderStyle>
);
