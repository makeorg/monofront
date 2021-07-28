import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { QuestionService } from '@make.org/utils/services/Question';
import { trackDisplaySearchConsultationsResult } from '@make.org/utils/services/Tracking';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { RouteComponentProps } from 'react-router';
import { useAppContext } from '@make.org/store';
import { BusinessConsultationsList } from '../../app/Search/MainResults/BusinessConsultationItem';
import { SearchBackButton } from '../../app/Search/BackButton';
import { MetaTags } from '../../app/MetaTags';
import {
  SearchPageTitleStyle,
  SearchPageContentStyle,
  SearchPageResultsStyle,
  SearchPageWrapperStyle,
} from './style';
import { SearchRegister } from '../../app/Search/Register';

export const SearchConsultations: React.FC<RouteComponentProps> = ({
  location,
  history,
}) => {
  const { state } = useAppContext();
  const { country, language, device } = state.appConfig;
  const params = new URLSearchParams(location.search);
  const term = params.get('query') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const isDesktop = matchDesktopDevice(device);

  const initQuestions = async () => {
    setIsLoading(true);
    const response = await QuestionService.searchQuestions(
      country,
      language,
      term
    );
    if (response) {
      const { results, total } = response;
      setQuestions(results);
      setCount(total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    trackDisplaySearchConsultationsResult();
  }, []);
  return (
    <SearchPageWrapperStyle>
      <MetaTags
        title={i18n.t('meta.search.consultations', {
          term,
        })}
      />
      <SearchBackButton term={term} history={history} />
      <SearchPageTitleStyle>
        {isLoading
          ? i18n.t('search.titles.loading')
          : i18n.t('search.titles.operations', {
              term,
              count,
            })}
      </SearchPageTitleStyle>
      <SearchPageContentStyle>
        <SearchPageResultsStyle>
          <BusinessConsultationsList questions={questions} />
        </SearchPageResultsStyle>
        {isDesktop && <SearchRegister />}
      </SearchPageContentStyle>
    </SearchPageWrapperStyle>
  );
};
