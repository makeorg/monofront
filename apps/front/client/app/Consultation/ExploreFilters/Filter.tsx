import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import { trackClickFilter } from '@make.org/utils/services/Tracking';
import { useParams } from 'react-router';
import { KEYWORD_THRESHOLD } from '@make.org/utils/constants/config';
import { QuestionService } from '@make.org/utils/services/Question';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxLabelStyle,
} from '@make.org/ui/elements/FormElements';
import { useAppContext } from '@make.org/store';
import { resetFilterAndSortState } from '@make.org/store/actions/filterAndSort';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionKeywordType, QuestionType } from '@make.org/types';
import { FilterSeparationLineStyle } from '@make.org/ui/elements/SeparatorsElements';
import { FILTER_ORGANISATION } from '@make.org/utils/constants/explore';
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
  handleChange: (name: string, value?: string) => void;
};

export const FiltersComponent: React.FC<Props> = ({ handleChange }: Props) => {
  const [keywords, setKeywords] = useState<QuestionKeywordType[]>([]);
  const { state, dispatch } = useAppContext();
  const { country } = useParams<{ country: string }>();
  const { filterAndSort } = state;
  const currentKeyword = filterAndSort.keywords;
  const question: QuestionType = selectCurrentQuestion(state);

  // retrieves question Keywords for filter
  const getQuestionKeywords = async () => {
    const response = await QuestionService.getQuestionKeywords(
      question.questionId,
      KEYWORD_THRESHOLD
    );
    if (response) {
      setKeywords(response);
    }
  };

  // helper for onClick keywords
  const handleKeyword = (key: string) => {
    // unclick on current keyword
    if (currentKeyword === key) {
      return handleChange('keywords', undefined);
    }

    trackClickFilter('keyword');
    return handleChange('keywords', key);
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
                className={currentKeyword === keyword.key ? 'selected' : ''}
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
          className={currentKeyword === keywords[0].key ? 'selected' : ''}
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
              value={JSON.stringify(filterAndSort.isNotVoted)}
              onChange={() => {
                handleChange(
                  'isNotVoted',
                  JSON.stringify(filterAndSort.isNotVoted)
                );
                trackClickFilter('unvoted-proposals');
              }}
            />
            <StyledCheckbox checked={filterAndSort.isNotVoted}>
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
            <StyledCheckbox checked={filterAndSort.userType !== undefined}>
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
          }}
          to={getExploreLink(country, question.slug, 1)}
        >
          {i18n.t('consultation.explore.reset_filters')}
        </ResetLinkStyle>
      </ResetLinkButtonWrapperStyle>
    </FilterBlockStyle>
  );
};
