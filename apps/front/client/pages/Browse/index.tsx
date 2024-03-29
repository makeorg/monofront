import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HomeQuestionType } from '@make.org/types';
import { QuestionService } from '@make.org/utils/services/Question';
import { Pagination } from '@make.org/components/Pagination';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { useLocation, useParams } from 'react-router';
import { isBrowseConsultationsPage } from '@make.org/utils/routes';
import i18n from 'i18next';
import {
  trackDisplayBrowseConsultations,
  trackDisplayBrowseResults,
} from '@make.org/utils/services/Tracking';
import { SpaceBetweenColumnStyle } from '@make.org/ui/elements/FlexElements';
import { IDS } from '@make.org/types/enums';
import { MetaTags } from '@make.org/components/MetaTags';
import { useAppContext } from '@make.org/store';
import hash from 'object-hash';
import { BrowseConsultationsTitles } from '../../app/Consultation/Browse/Titles';
import { BrowseConsultationsHeader } from '../../app/Consultation/Browse/Header';
import { BrowseConsultationsList } from '../../app/Consultation/Browse/List';

type consultationListType = 'opened' | 'finished';
type consultationDataType = {
  total: number;
  results: HomeQuestionType[];
} | null;

const CONSULTATION_LIST_LIMIT = 8;

const BrowseConsultationsPage: FC = () => {
  const location = useLocation();
  const { state } = useAppContext();
  const { language } = state.appConfig;
  const params = useParams<{ country: string; pageId: string }>();
  const { country, pageId } = params;
  const consultationsPage = isBrowseConsultationsPage(location.pathname);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<HomeQuestionType[] | null>(null);
  const [questionsTotal, setTotal] = useState<number>(0);
  const currentPageId = parseInt(pageId, 10);

  const cache: MutableRefObject<{
    [cachekey: string]: { total: number; results: HomeQuestionType[] } | null;
  }> = useRef({});

  const currentConsultationListType: consultationListType = consultationsPage
    ? 'opened'
    : 'finished';

  const fetchDataAndCache = async (
    argCountry: string,
    argLanguage: string,
    argConsultationType: consultationListType,
    page: number
  ): Promise<consultationDataType> => {
    const args: [string, string, number, number] = [
      argCountry,
      argLanguage,
      CONSULTATION_LIST_LIMIT,
      CONSULTATION_LIST_LIMIT * (page - 1),
    ];

    const cacheKey = hash({
      ...args,
      argConsultationType,
    });

    if (cache.current[cacheKey]) {
      return Promise.resolve(cache.current[cacheKey]);
    }

    let data: consultationDataType = { results: [], total: 0 };
    if (argConsultationType === 'opened') {
      data = await QuestionService.getOpenedConsultations(...args);
    }
    if (argConsultationType === 'finished') {
      data = await QuestionService.getFinishedConsultations(...args);
    }

    cache.current[cacheKey] = data;

    return data;
  };

  /**
   * First, pretech and cache some data :
   * - data from the next and preview pages of the current consultation list
   * - data from the page 1 of the other consultation list
   *
   * Possible improvement : preserve cache when unmount
   */
  const prefetchAndManageCache = async (
    currentConsultationType: consultationListType,
    currentPage: number,
    currentConsultationTotal: number,
    preferredLanguage: string
  ) => {
    const nextPage =
      currentPage <
      Math.ceil(currentConsultationTotal / CONSULTATION_LIST_LIMIT)
        ? currentPage + 1
        : null;
    const previewPage = currentPage > 1 ? currentPage - 1 : null;
    const otherList =
      currentConsultationType === 'opened' ? 'finished' : 'opened';

    const calls = [];
    calls.push(fetchDataAndCache(country, preferredLanguage, otherList, 1));
    if (nextPage) {
      calls.push(
        fetchDataAndCache(
          country,
          preferredLanguage,
          currentConsultationType,
          nextPage
        )
      );
    }
    if (previewPage) {
      calls.push(
        fetchDataAndCache(
          country,
          preferredLanguage,
          currentConsultationType,
          previewPage
        )
      );
    }

    await Promise.all(calls);
  };

  const loadConsultations = async () => {
    setIsLoading(true);
    const data = await fetchDataAndCache(
      country,
      language,
      currentConsultationListType,
      currentPageId
    );
    if (data) {
      setQuestions(data.results);
      setTotal(data.total);
    }
    setIsLoading(false);
    prefetchAndManageCache(
      currentConsultationListType,
      currentPageId,
      data?.total || 0,
      language
    );
  };

  useEffect(() => {
    loadConsultations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, language, currentConsultationListType, currentPageId]);

  useEffect(() => {
    if (currentConsultationListType === 'opened') {
      trackDisplayBrowseConsultations();
    }
    if (currentConsultationListType === 'finished') {
      trackDisplayBrowseResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConsultationListType, country]);

  return (
    <>
      {currentConsultationListType === 'opened' && (
        <MetaTags
          title={i18n.t('meta.browse.consultations.title')}
          description={i18n.t('meta.browse.consultations.description')}
        />
      )}
      {currentConsultationListType === 'finished' && (
        <MetaTags
          title={i18n.t('meta.browse.results.title')}
          description={i18n.t('meta.browse.results.description')}
        />
      )}

      <BrowseConsultationsHeader />
      {isLoading ? (
        <SpaceBetweenColumnStyle as="section" id={IDS.BROWSE_SECTION}>
          <Spinner />
        </SpaceBetweenColumnStyle>
      ) : (
        <SpaceBetweenColumnStyle
          as="section"
          aria-labelledby="browse_title"
          id={IDS.BROWSE_SECTION}
        >
          <BrowseConsultationsTitles
            total={questionsTotal}
            sectionTitleId="browse_title"
          />
          {questions && (
            <BrowseConsultationsList
              questions={questions}
              resultsContext={currentConsultationListType === 'finished'}
              total={questionsTotal}
            />
          )}
          {questionsTotal > CONSULTATION_LIST_LIMIT ? (
            <Pagination
              itemsPerPage={CONSULTATION_LIST_LIMIT}
              itemsTotal={questionsTotal}
              scrollToId={IDS.BROWSE_SECTION}
            />
          ) : null}
        </SpaceBetweenColumnStyle>
      )}
    </>
  );
};

// default export needed for loadable component
export default BrowseConsultationsPage; // eslint-disable-line import/no-default-export
