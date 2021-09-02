import React, { FormEvent, Dispatch, SetStateAction } from 'react';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { TypeFilterAndSortValues, QuestionKeywordType } from '@make.org/types';
import { FilterAndSort } from './index';
import { FilterPanelStyle, SvgFilterPanelStyle } from './style';

type Props = {
  filterAndSortValues: TypeFilterAndSortValues;
  setFilterAndSortValues: Dispatch<SetStateAction<TypeFilterAndSortValues>>;
  keywords: QuestionKeywordType[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
};

export const SortAndFiltersCTA: React.FC<Props> = ({
  filterAndSortValues,
  setFilterAndSortValues,
  keywords,
  handleSubmit,
  handleReset,
}: Props) => {
  const { dispatch } = useAppContext();

  return (
    <FilterPanelStyle
      onClick={() =>
        dispatch(
          setPanelContent(
            <FilterAndSort
              filterAndSortValues={filterAndSortValues}
              setFilterAndSortValues={setFilterAndSortValues}
              keywords={keywords}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
            />
          )
        )
      }
      data-cy-button="sortandfilters-panel"
    >
      <SvgFilterPanelStyle aria-hidden focusable="false" />
      {i18n.t('consultation.explore.filter')}
    </FilterPanelStyle>
  );
};
