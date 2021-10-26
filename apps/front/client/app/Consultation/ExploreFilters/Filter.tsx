import React, { useState } from 'react';
import i18n from 'i18next';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import { trackClickFilter } from '@make.org/utils/services/Tracking';
import { useParams } from 'react-router';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxLabelStyle,
} from '@make.org/ui/elements/FormElements';
import { useAppContext } from '@make.org/store';
import { resetFilterAndSortState } from '@make.org/store/actions/filterAndSort';
import {
  QuestionKeywordType,
  QuestionType,
  TypeFilterAndSortValues,
} from '@make.org/types';
import { FilterSeparationLineStyle } from '@make.org/ui/elements/SeparatorsElements';
import {
  SORT_RECENT,
  FILTER_ORGANISATION,
} from '@make.org/utils/constants/explore';
import { getExploreLink } from '@make.org/utils/helpers/url';
import {
  ResetLinkStyle,
  ResetLinkButtonWrapperStyle,
} from '../../../pages/Consultation/style';
import {
  TransparentButtonFilter,
  KeywordsListWrapperStyle,
  KeywordsItemWrapperStyle,
  FilterByWrapperStyle,
  FilterByElementStyle,
  FiltersTitleStyle,
  SvgFilterBy,
  FilterBlockStyle,
  SvgArrowUp,
} from './style';

type Props = {
  handleClassName(
    currentValue: string | undefined,
    elementValue: string
  ): string;
  handleChange: (name: string, value?: string) => void;
  setCurrentSort: (name: string) => void;
  keywords: QuestionKeywordType[];
  filterAndSortValues: TypeFilterAndSortValues;
  question: QuestionType;
};

export const FiltersComponent: React.FC<Props> = ({
  handleClassName,
  handleChange,
  setCurrentSort,
  keywords,
  filterAndSortValues,
  question,
}: Props) => {
  const [currentKeyword, setCurrentKeyword] = useState<string | undefined>(
    undefined
  );
  const { dispatch } = useAppContext();
  const { country } = useParams<{ country: string }>();

  // helper for onClick keywords
  const handleKeyword = (key: string) => {
    // unclick on current keyword
    if (currentKeyword === key) {
      setCurrentKeyword(undefined);
      return handleChange('keywords', undefined);
    }

    setCurrentKeyword(key);
    trackClickFilter('keyword');
    return handleChange('keywords', key);
  };

  return (
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
          name="keywords"
          value={keywords[0].key}
          onClick={() => {
            handleKeyword(keywords[0].key);
          }}
          className={handleClassName(currentKeyword, keywords[0].key)}
        >
          {keywords[0].key}
        </TransparentButtonFilter>
      )}
      <FilterSeparationLineStyle />
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
      <ResetLinkButtonWrapperStyle>
        <ResetLinkStyle
          onClick={() => {
            dispatch(resetFilterAndSortState());
            setCurrentSort(SORT_RECENT);
            setCurrentKeyword('');
          }}
          to={getExploreLink(country, question.slug, 1)}
        >
          {i18n.t('consultation.explore.reset_filters')}
        </ResetLinkStyle>
      </ResetLinkButtonWrapperStyle>
    </FilterBlockStyle>
  );
};
