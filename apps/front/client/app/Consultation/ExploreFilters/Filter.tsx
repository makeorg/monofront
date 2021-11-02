import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { useParams, useHistory } from 'react-router';
import { getExploreLink } from '@make.org/utils/helpers/url';
import {
  TypeFiltersValues,
  QuestionKeywordType,
  QuestionType,
} from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  updateFilters,
  resetFilters,
} from '@make.org/store/actions/filterAndSort';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import { trackClickFilter } from '@make.org/utils/services/Tracking';
import { KEYWORD_THRESHOLD } from '@make.org/utils/constants/config';
import { QuestionService } from '@make.org/utils/services/Question';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxLabelStyle,
} from '@make.org/ui/elements/FormElements';
import { FilterSeparationLineStyle } from '@make.org/ui/elements/SeparatorsElements';
import { FILTER_ORGANISATION } from '@make.org/utils/constants/explore';
import {
  ResetLinkStyle,
  ResetLinkButtonWrapperStyle,
} from '../../../pages/Consultation/style';
import {
  TransparentButtonFilterStyle,
  KeywordsListWrapperStyle,
  KeywordsItemWrapperStyle,
  FilterByWrapperStyle,
  FilterByElementStyle,
  FiltersTitleStyle,
  SvgFilterBy,
  FilterBlockStyle,
  SvgArrowUp,
} from './style';
import { getUpdatedFiltersValues } from '../../../helper/filterAndSort';

export const FiltersComponent: React.FC = () => {
  const [keywordsCTA, setKeywordsCTA] = useState<QuestionKeywordType[]>([]);
  const { state, dispatch } = useAppContext();
  const { keywords, isNotVoted, userType } = state.filterAndSort;
  const currentFiltersValues = { keywords, isNotVoted, userType };
  const currentKeyword = keywords;
  const history = useHistory();
  const { country, pageId } = useParams<{ country: string; pageId: string }>();
  const question: QuestionType = selectCurrentQuestion(state);

  // retrieves question Keywords for filter
  const getQuestionKeywords = async () => {
    const response = await QuestionService.getQuestionKeywords(
      question.questionId,
      KEYWORD_THRESHOLD
    );
    if (response) {
      setKeywordsCTA(response);
    }
  };

  // handles filters values updates in state
  const handleFiltersChange = (name: string, value?: string) => {
    const newFiltersValues: TypeFiltersValues = getUpdatedFiltersValues(
      currentFiltersValues,
      name,
      value
    );
    dispatch(updateFilters(newFiltersValues));
    // redirects to first page when changing filters and/or sort in pagination
    // to remove when state in url params is done
    if (pageId !== '1') {
      history.push(getExploreLink(country, question.slug));
    }
  };

  // helper for onClick keywords
  const handleKeyword = (key: string) => {
    // unclick on current keyword
    if (currentKeyword === key) {
      handleFiltersChange('keywords', undefined);
      return;
    }

    trackClickFilter('keyword');
    handleFiltersChange('keywords', key);
  };

  useEffect(() => {
    getQuestionKeywords();
  }, []);

  return (
    <FilterBlockStyle>
      <FiltersTitleStyle>
        <SvgArrowUp aria-hidden focusable="false" />
        {i18n.t('consultation.cards.keywords.title')}
      </FiltersTitleStyle>
      {keywordsCTA.length > 1 && (
        <KeywordsListWrapperStyle>
          {keywordsCTA.map(keyword => (
            <KeywordsItemWrapperStyle key={keyword.key}>
              <TransparentButtonFilterStyle
                type="button"
                name="keywords"
                value={keyword.key}
                onClick={() => {
                  handleKeyword(keyword.key);
                }}
                className={currentKeyword === keyword.key ? 'selected' : ''}
              >
                {keyword.key}
              </TransparentButtonFilterStyle>
            </KeywordsItemWrapperStyle>
          ))}
        </KeywordsListWrapperStyle>
      )}
      {keywordsCTA.length === 1 && (
        <TransparentButtonFilterStyle
          type="button"
          name="keywords"
          value={keywordsCTA[0].key}
          onClick={() => {
            handleKeyword(keywordsCTA[0].key);
          }}
          className={currentKeyword === keywordsCTA[0].key ? 'selected' : ''}
        >
          {keywordsCTA[0].key}
        </TransparentButtonFilterStyle>
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
              value={JSON.stringify(currentFiltersValues.isNotVoted)}
              onChange={() => {
                handleFiltersChange(
                  'isNotVoted',
                  JSON.stringify(currentFiltersValues.isNotVoted)
                );
                trackClickFilter('unvoted-proposals');
              }}
            />
            <StyledCheckbox checked={currentFiltersValues.isNotVoted}>
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
                handleFiltersChange('userType', FILTER_ORGANISATION);
                trackClickFilter('organizations-proposals');
              }}
            />
            <StyledCheckbox
              checked={currentFiltersValues.userType !== undefined}
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
            dispatch(resetFilters());
          }}
          to={getExploreLink(country, question.slug, 1)}
        >
          {i18n.t('consultation.explore.reset_filters')}
        </ResetLinkStyle>
      </ResetLinkButtonWrapperStyle>
    </FilterBlockStyle>
  );
};
