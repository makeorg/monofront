import React, { useState } from 'react';
import { useAppContext } from '@make.org/store';
import { useHistory, useLocation } from 'react-router';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickSort } from '@make.org/utils/services/Tracking';
import { QuestionType, TypeSortValues } from '@make.org/types';
import { parse, stringify } from 'query-string';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  modalCloseFilters,
  modalCloseSort,
} from '@make.org/store/actions/modal';
import { getExploreLink } from '@make.org/utils/helpers/url';
import {
  checkCurrentSort,
  SORT_ITEMS,
  getSortLabel,
  getUpdatedSortValues,
  SORT_RECENT,
} from '../../../helpers/filterAndSort';
import {
  RadioAsTransparentButtonLabelStyle,
  RadioListWrapperStyle,
  RadioItemWrapperStyle,
  FilterBlockStyle,
  FiltersAndSortTitleStyle,
  SvgArrowsGroup,
  FiltersAndSortRedButtonStyle,
} from './style';

export const SortComponent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { country, device } = state.appConfig;
  const history = useHistory();
  const { search } = useLocation();
  const urlQueryParams = parse(search);
  const { sortAlgorithm, sort }: { sortAlgorithm?: string; sort?: string } =
    urlQueryParams;
  const currentSortValues = { sortAlgorithm, sort };
  const question: QuestionType = selectCurrentQuestion(state);
  const [currentSort, setCurrentSort] = useState<string>(
    sort || sortAlgorithm || SORT_RECENT
  );
  const isMobile = matchMobileDevice(device);
  const { showSort } = state.modal;
  const isSort = showSort === true;

  // handles sort values updates in url
  const handleSortChange = (name: string, value?: string) => {
    const newSortValues: TypeSortValues = getUpdatedSortValues(
      currentSortValues,
      name,
      value
    );
    history.push({
      // redirects to first page when changing sort
      pathname: getExploreLink(country, question.slug),
      search: stringify({ ...urlQueryParams, ...newSortValues }),
    });
  };

  return (
    <FilterBlockStyle>
      <FiltersAndSortTitleStyle>
        <SvgArrowsGroup aria-hidden focusable="false" />
        {i18n.t('consultation.explore.sort_by')}
      </FiltersAndSortTitleStyle>
      <RadioListWrapperStyle defaultValue={SORT_RECENT}>
        {SORT_ITEMS.map(
          (item: { name: string; icon: JSX.Element; value?: string }) => (
            <RadioItemWrapperStyle
              key={item.name}
              className={item.name === currentSort ? 'selected' : ''}
            >
              <ScreenReaderItemStyle>
                <input
                  id={item.name}
                  type="radio"
                  value={item.value}
                  name="sort"
                  onChange={() => {
                    handleSortChange(item.name, item.value);
                    setCurrentSort(item.name);
                    trackClickSort(item.name);
                  }}
                  checked={checkCurrentSort(item.name, currentSort)}
                />
              </ScreenReaderItemStyle>
              <RadioAsTransparentButtonLabelStyle
                htmlFor={item.name}
                className={item.name === currentSort ? 'selected' : ''}
              >
                {item.icon}
                {getSortLabel(item.name)}
              </RadioAsTransparentButtonLabelStyle>
            </RadioItemWrapperStyle>
          )
        )}
      </RadioListWrapperStyle>
      {isMobile && (
        <FiltersAndSortRedButtonStyle
          onClick={() =>
            isSort ? dispatch(modalCloseSort()) : dispatch(modalCloseFilters())
          }
        >
          {i18n.t('consultation.explore.sort_and_close')}
        </FiltersAndSortRedButtonStyle>
      )}
    </FilterBlockStyle>
  );
};
