import React from 'react';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { QuestionKeywordType } from '@make.org/types';
import { FilterAndSort } from './index';
import { FilterPanelStyle, SvgFilterPanelStyle } from './style';

type Props = {
  keywords: QuestionKeywordType[];
};

export const SortAndFiltersCTA: React.FC<Props> = ({ keywords }: Props) => {
  const { dispatch } = useAppContext();

  return (
    <FilterPanelStyle
      onClick={() => dispatch(setPanelContent(<FilterAndSort />))}
      data-cy-button="sortandfilters-panel"
    >
      <SvgFilterPanelStyle aria-hidden focusable="false" />
      {i18n.t('consultation.explore.filter')}
    </FilterPanelStyle>
  );
};
