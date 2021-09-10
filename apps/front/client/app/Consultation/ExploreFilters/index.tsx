import React, { FormEvent, Dispatch, SetStateAction, useState } from 'react';
import i18n from 'i18next';
import { throttle } from '@make.org/utils/helpers/throttle';
import { TypeFilterAndSortValues, QuestionKeywordType } from '@make.org/types';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import {
  SORT_POPULAR,
  SORT_RECENT,
  SORT_CONTROVERSY,
  FILTER_ORGANISATION,
} from '@make.org/utils/constants/explore';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxLabelStyle,
} from '@make.org/ui/elements/FormElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  trackClickFilter,
  trackClickSort,
} from '@make.org/utils/services/Tracking';
import {
  ResetLinkStyle,
  ResetLinkButtonWrapperStyle,
} from '../../../pages/Consultation/style';
import {
  FilterBlockStyle,
  FiltersWrapperStyle,
  FiltersTitleStyle,
  TransparentButtonFilter,
  KeywordsListWrapperStyle,
  KeywordsItemWrapperStyle,
  RadioAsTransparentButtonLabelStyle,
  SvgArrowUp,
  SvgArrowsGroup,
  SvgFilterBy,
  SvgRecent,
  SvgPopular,
  SvgControversial,
  RadioListWrapperStyle,
  RadioItemWrapperStyle,
  FilterByWrapperStyle,
  FilterByElementStyle,
  RedSubmitButtonWrapperStyle,
} from './style';

type Props = {
  filterAndSortValues: TypeFilterAndSortValues;
  setFilterAndSortValues: Dispatch<SetStateAction<TypeFilterAndSortValues>>;
  keywords: QuestionKeywordType[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
};

// handle className for sort and keyword button and radio css
const handleClassName = (
  currentValue: string | undefined,
  elementValue: string
): string => {
  if (elementValue === currentValue) {
    return 'selected';
  }
  return '';
};

// handles sort items for sortAlgorithm
const SORT_ITEMS: Array<{
  name: string;
  icon: JSX.Element;
  label: string;
  value?: string;
}> = [
  {
    name: SORT_RECENT,
    icon: <SvgRecent />,
    label: i18n.t('consultation.explore.recent'),
    value: undefined,
  },
  {
    name: SORT_POPULAR,
    icon: <SvgPopular />,
    label: i18n.t('consultation.explore.popular'),
    value: SORT_POPULAR,
  },
  {
    name: SORT_CONTROVERSY,
    icon: <SvgControversial />,
    label: i18n.t('consultation.explore.controversial'),
    value: SORT_CONTROVERSY,
  },
];

// handles filter and sort values updates
const getUpdatedFilterAndSortValues = (
  currentFilterAndSortValues: TypeFilterAndSortValues,
  name: string,
  value?: string
): TypeFilterAndSortValues => {
  switch (name) {
    case SORT_RECENT:
      return {
        ...currentFilterAndSortValues,
        sort: 'RECENT',
        sortAlgorithm: undefined,
      };
    case SORT_POPULAR:
    case SORT_CONTROVERSY:
      return {
        ...currentFilterAndSortValues,
        sort: undefined,
        sortAlgorithm: value,
      };
    case 'isNotVoted':
      return {
        ...currentFilterAndSortValues,
        isNotVoted: !JSON.parse(value || 'false'),
      };
    case 'userType':
      return {
        ...currentFilterAndSortValues,
        userType:
          currentFilterAndSortValues.userType === 'ORGANISATION'
            ? undefined
            : value,
      };
    case 'keywords':
      return {
        ...currentFilterAndSortValues,
        keywords: value,
      };
    default:
      throw new Error(`Unexpected value : "${name}"`);
  }
};

const checkCurrentSort = (itemName: string, currentSort: string): boolean => {
  if (itemName === currentSort) {
    return true;
  }
  return false;
};

export const FilterAndSort: React.FC<Props> = ({
  filterAndSortValues,
  setFilterAndSortValues,
  keywords,
  handleSubmit,
  handleReset,
}: Props) => {
  const [currentSort, setCurrentSort] = useState<string>(SORT_RECENT);
  const [currentKeyword, setCurrentKeyword] = useState<string | undefined>(
    undefined
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const handleChange = (name: string, value?: string) => {
    const newFilterAndSortValues: TypeFilterAndSortValues =
      getUpdatedFilterAndSortValues(filterAndSortValues, name, value);
    setFilterAndSortValues(newFilterAndSortValues);
    setIsDisabled(false);
  };

  // helper for onClick keywords
  const handleKeyword = (key: string) => {
    if (currentKeyword) {
      setCurrentKeyword(undefined);
      return handleChange('keywords', undefined);
    }
    setCurrentKeyword(key);
    return handleChange('keywords', key);
  };

  return (
    <FiltersWrapperStyle as="form" onSubmit={throttle(handleSubmit)}>
      <ResetLinkButtonWrapperStyle>
        <ResetLinkStyle
          type="button"
          onClick={() => {
            handleReset();
            setIsDisabled(true);
            setCurrentSort(SORT_RECENT);
            setCurrentKeyword('');
          }}
        >
          {i18n.t('consultation.explore.reset_filters')}
        </ResetLinkStyle>
      </ResetLinkButtonWrapperStyle>
      <FilterBlockStyle>
        <FiltersTitleStyle>
          <SvgArrowUp aria-hidden focusable="false" />
          {i18n.t('consultation.cards.keywords.title')}
        </FiltersTitleStyle>
        {keywords.length > 1 && (
          <KeywordsListWrapperStyle>
            {keywords.map(keyword => (
              <KeywordsItemWrapperStyle key={keyword.key}>
                <TransparentButtonFilter
                  type="button"
                  name="keywords"
                  value={keyword.key}
                  onClick={() => {
                    handleKeyword(keyword.key);
                    trackClickFilter('keyword');
                  }}
                  className={handleClassName(currentKeyword, keyword.key)}
                >
                  {keyword.key}
                </TransparentButtonFilter>
              </KeywordsItemWrapperStyle>
            ))}
          </KeywordsListWrapperStyle>
        )}
        {keywords.length === 1 && (
          <TransparentButtonFilter
            type="button"
            onClick={() => handleChange('keywords', keywords[0].key)}
            value={keywords[0].key}
          >
            {keywords[0].key}
          </TransparentButtonFilter>
        )}
      </FilterBlockStyle>
      <FilterBlockStyle>
        <FiltersTitleStyle>
          <SvgArrowsGroup aria-hidden focusable="false" />
          {i18n.t('consultation.explore.sort_by')}
        </FiltersTitleStyle>
        <RadioListWrapperStyle>
          {SORT_ITEMS.map(
            (item: {
              name: string;
              icon: JSX.Element;
              label: string;
              value?: string;
            }) => (
              <RadioItemWrapperStyle
                key={item.name}
                className={handleClassName(currentSort, item.name)}
              >
                <ScreenReaderItemStyle>
                  <input
                    id={item.name}
                    type="radio"
                    value={item.value}
                    name="sort"
                    onChange={() => {
                      handleChange(item.name, item.value);
                      setCurrentSort(item.name);
                      trackClickSort(item.name);
                    }}
                    checked={checkCurrentSort(item.name, currentSort)}
                  />
                </ScreenReaderItemStyle>
                <RadioAsTransparentButtonLabelStyle
                  htmlFor={item.name}
                  className={handleClassName(currentSort, item.name)}
                >
                  {item.icon}
                  {item.label}
                </RadioAsTransparentButtonLabelStyle>
              </RadioItemWrapperStyle>
            )
          )}
        </RadioListWrapperStyle>
      </FilterBlockStyle>
      <FilterBlockStyle>
        <FiltersTitleStyle>
          <SvgFilterBy aria-hidden focusable="false" />
          {i18n.t('consultation.explore.filter_by')}
        </FiltersTitleStyle>
        <FilterByWrapperStyle>
          <FilterByElementStyle>
            <CheckboxLabelStyle htmlFor="isNotVoted" noFontSizeChange>
              <HiddenCheckbox
                type="checkbox"
                id="isNotVoted"
                name="isNotVoted"
                value={JSON.stringify(filterAndSortValues.isNotVoted)}
                onChange={() => {
                  handleChange(
                    'isNotVoted',
                    JSON.stringify(filterAndSortValues.isNotVoted)
                  );
                  trackClickFilter('unvoted-proposals');
                }}
              />
              <StyledCheckbox checked={filterAndSortValues.isNotVoted}>
                <SvgCheck />
              </StyledCheckbox>
              {i18n.t('consultation.explore.unvoted')}
            </CheckboxLabelStyle>
          </FilterByElementStyle>
          <FilterByElementStyle>
            <CheckboxLabelStyle htmlFor="userType" noFontSizeChange>
              <HiddenCheckbox
                type="checkbox"
                value={FILTER_ORGANISATION}
                id="userType"
                name="userType"
                onChange={() => {
                  handleChange('userType', FILTER_ORGANISATION);
                  trackClickFilter('organizations-proposals');
                }}
              />
              <StyledCheckbox
                checked={filterAndSortValues.userType !== undefined}
              >
                <SvgCheck />
              </StyledCheckbox>
              {i18n.t('consultation.explore.organisations_proposals')}
            </CheckboxLabelStyle>
          </FilterByElementStyle>
        </FilterByWrapperStyle>
      </FilterBlockStyle>
      <RedSubmitButtonWrapperStyle>
        <RedButtonStyle type="submit" disabled={isDisabled}>
          {i18n.t('consultation.explore.display_proposals')}
        </RedButtonStyle>
      </RedSubmitButtonWrapperStyle>
    </FiltersWrapperStyle>
  );
};
