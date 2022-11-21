import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { getExploreLink } from '@make.org/utils/helpers/url';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useHistory, useLocation } from 'react-router';
import {
  TypeFiltersValues,
  QuestionKeywordType,
  QuestionType,
} from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
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
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { FEATURE_FLIPPING } from '@make.org/types/enums';
import {
  modalCloseFilters,
  modalCloseSort,
} from '@make.org/store/actions/modal';
import { parse, stringify } from 'query-string';
import { getUpdatedFiltersValues } from '../../../helpers/filterAndSort';
import {
  ResetLinkStyle,
  ResetLinkButtonWrapperStyle,
} from '../../../pages/Consultation/style';
import {
  TransparentButtonFilterStyle,
  KeywordsListWrapperStyle,
  FilterByWrapperStyle,
  FilterByElementStyle,
  FiltersAndSortTitleStyle,
  SvgFilterBy,
  FilterBlockStyle,
  SvgArrowUp,
  FiltersAndSortRedButtonStyle,
} from './style';

export const FiltersComponent: React.FC = () => {
  const [keywordsCTA, setKeywordsCTA] = useState<QuestionKeywordType[]>([]);
  const { state, dispatch } = useAppContext();
  const { country, device } = state.appConfig;
  const history = useHistory();
  const { search } = useLocation();
  const urlQueryParams = parse(search);
  const {
    keywords,
    isNotVoted,
    userType,
    sort,
    sortAlgorithm,
  }: {
    keywords?: string;
    isNotVoted?: boolean;
    userType?: string;
    sort?: string;
    sortAlgorithm?: string;
  } = urlQueryParams;
  const currentSortValues = { sort, sortAlgorithm };
  const currentFiltersValues = { keywords, isNotVoted, userType };
  const currentKeyword = keywords;
  const question: QuestionType = selectCurrentQuestion(state);
  const isMobile = matchMobileDevice(device);
  const { showSort } = state.modal;
  const isSort = showSort === true;

  const isKeywordActive: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.CONSULTATION_KEYWORD_ACTIVE,
    question.activeFeatures
  );

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

  // handles filters values updates in url
  const handleFiltersChange = (name: string, value?: string) => {
    const newFiltersValues: TypeFiltersValues = getUpdatedFiltersValues(
      currentFiltersValues,
      name,
      value
    );

    history.push({
      // redirects to first page when changing filters
      pathname: getExploreLink(country, question.slug),
      search: stringify({ ...urlQueryParams, ...newFiltersValues }),
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FilterBlockStyle>
      {isKeywordActive && (
        <>
          <FiltersAndSortTitleStyle>
            <SvgArrowUp aria-hidden focusable="false" />
            <>{i18n.t('consultation.cards.keywords.title')}</>
          </FiltersAndSortTitleStyle>
          {keywordsCTA.length > 1 && (
            <KeywordsListWrapperStyle>
              {keywordsCTA.map(keyword => (
                <li key={keyword.key}>
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
                </li>
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
              className={
                currentKeyword === keywordsCTA[0].key ? 'selected' : ''
              }
            >
              {keywordsCTA[0].key}
            </TransparentButtonFilterStyle>
          )}
          <FilterSeparationLineStyle />
        </>
      )}
      <FiltersAndSortTitleStyle>
        <SvgFilterBy aria-hidden focusable="false" />
        <>{i18n.t('consultation.explore.filter_by')}</>
      </FiltersAndSortTitleStyle>
      <FilterByWrapperStyle>
        <FilterByElementStyle>
          <CheckboxLabelStyle htmlFor="isNotVoted" noFontSizeChange>
            <HiddenCheckbox
              type="checkbox"
              id="isNotVoted"
              name="isNotVoted"
              value={JSON.stringify(currentFiltersValues.isNotVoted)}
              onChange={() => {
                handleFiltersChange('isNotVoted');
                trackClickFilter('unvoted-proposals');
              }}
              checked={!!currentFiltersValues.isNotVoted}
            />
            <StyledCheckbox isChecked={currentFiltersValues.isNotVoted}>
              <SvgCheck />
            </StyledCheckbox>
            <>{i18n.t('consultation.explore.unvoted')}</>
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
              checked={currentFiltersValues.userType !== undefined}
            />
            <StyledCheckbox
              isChecked={currentFiltersValues.userType !== undefined}
            >
              <SvgCheck />
            </StyledCheckbox>
            <>{i18n.t('consultation.explore.organisations_proposals')}</>
          </CheckboxLabelStyle>
        </FilterByElementStyle>
      </FilterByWrapperStyle>
      {isMobile && (
        <FiltersAndSortRedButtonStyle
          onClick={
            isSort
              ? () => dispatch(modalCloseSort())
              : () => dispatch(modalCloseFilters())
          }
        >
          {i18n.t('consultation.explore.filter_and_close')}
        </FiltersAndSortRedButtonStyle>
      )}
      <ResetLinkButtonWrapperStyle>
        <ResetLinkStyle
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={isMobile ? () => dispatch(modalCloseFilters()) : () => {}}
          to={getExploreLink(country, question.slug, 1, currentSortValues)}
        >
          {isMobile ? (
            <>{i18n.t('consultation.explore.reset_filters_and_close')}</>
          ) : (
            <>{i18n.t('consultation.explore.reset_filters')}</>
          )}
        </ResetLinkStyle>
      </ResetLinkButtonWrapperStyle>
    </FilterBlockStyle>
  );
};
