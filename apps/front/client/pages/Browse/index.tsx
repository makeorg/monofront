import React, { FC, useEffect, useState } from 'react';
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
import { BrowseConsultationsTitles } from '../../app/Consultation/Browse/Titles';
import { BrowseConsultationsHeader } from '../../app/Consultation/Browse/Header';
import { BrowseConsultationsList } from '../../app/Consultation/Browse/List';

const BrowseConsultationsPage: FC = () => {
  const location = useLocation();
  const params = useParams<{ country: string; pageId: string }>();
  const { country, pageId } = params;
  const consultationsPage = isBrowseConsultationsPage(location.pathname);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<HomeQuestionType[] | null>(null);
  const [questionsTotal, setTotal] = useState<number>(0);
  const currentPageId = parseInt(pageId, 10);

  const CONSULTATIONS_STATUS = consultationsPage ? 'open' : 'finished';
  const SORT_ALGORITHM = consultationsPage ? 'featured' : 'chronological';
  const CONSULTATIONS_LIMIT = 8;
  const CONSULTATIONS_SKIP = CONSULTATIONS_LIMIT * (currentPageId - 1);

  const initConsultationsList = async () => {
    setIsLoading(true);
    const response = await QuestionService.getQuestions(
      country,
      CONSULTATIONS_STATUS,
      SORT_ALGORITHM,
      CONSULTATIONS_LIMIT,
      CONSULTATIONS_SKIP
    );

    if (response) {
      setQuestions(response.results);
      setTotal(response.total);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initConsultationsList();
    if (consultationsPage) {
      trackDisplayBrowseConsultations();
    } else {
      trackDisplayBrowseResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CONSULTATIONS_STATUS, SORT_ALGORITHM, params]);

  return (
    <>
      {consultationsPage ? (
        <MetaTags
          title={i18n.t('meta.browse.consultations.title')}
          description={i18n.t('meta.browse.consultations.description')}
        />
      ) : (
        <MetaTags
          title={i18n.t('meta.browse.results.title')}
          description={i18n.t('meta.browse.results.description')}
        />
      )}
      <BrowseConsultationsHeader />
      {isLoading ? (
        <>
          <SpaceBetweenColumnStyle as="section" id={IDS.BROWSE_SECTION}>
            <Spinner />
          </SpaceBetweenColumnStyle>
        </>
      ) : (
        <>
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
                resultsContext={!consultationsPage}
                total={questionsTotal}
              />
            )}
            {questionsTotal > CONSULTATIONS_LIMIT ? (
              <Pagination
                itemsPerPage={CONSULTATIONS_LIMIT}
                itemsTotal={questionsTotal}
                scrollToId={IDS.BROWSE_SECTION}
              />
            ) : null}
          </SpaceBetweenColumnStyle>
        </>
      )}
    </>
  );
};

// default export needed for loadable component
export default BrowseConsultationsPage; // eslint-disable-line import/no-default-export
