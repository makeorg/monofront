// @flow
import React, { useEffect, useState } from 'react';
import { getTopIdeasLink, redirectToNotFoundPage } from 'Shared/helpers/url';
import { useParams, useLocation } from 'react-router-dom';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import { type TopIdeaType } from 'Shared/types/topIdea';
import { trackDisplayTopIdeas } from 'Shared/services/Tracking';
import { IntroBanner } from 'Client/features/consultation/IntroBanner/index';
import { FollowUs } from 'Client/features/flipping/FollowUs';
import { TopIdeaService } from 'Shared/services/TopIdea';
import { TopIdeaCard } from 'Client/features/topIdeas/Card';
import { i18n } from 'Shared/i18n';
import {
  type BreadcrumbsPagesType,
  Breadcrumbs,
} from 'Client/app/Breadcrumbs/DeprecatedBreadcrumbs';

import { MUNICIPAL_PERSONALITY_HEADER } from 'Shared/constants/featureFlipping';
import { CandidateEngagement } from 'Client/custom/municipales/CandidateEngagement';
import { checkIsFeatureActivated } from 'Client/helper/featureFlipping';
import { MetaTags } from 'Client/app/MetaTags';
import { ConsultationSidebar } from 'Client/features/consultation/Sidebar';
import { ColumnElementStyle } from 'Client/ui/Elements/FlexElements';
import { TopIdeaDetailsSkipLinks } from 'Client/app/SkipLinks/TopIdeaDetails';
import { TopIdeaDetailsProposals } from 'Client/features/topIdeas/Proposals';
import { TopIdeaDetailsComments } from 'Client/features/topIdeas/Comments';
import { MobileDescriptionImage } from 'Client/features/consultation/MobileDescriptionImage';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { matchMobileDevice } from 'Shared/helpers/styled';
import {
  ConsultationPageContentStyle,
  ConsultationPageWrapperStyle,
  ConsultationHeaderWrapperStyle,
} from './style';

const TopIdeaDetailsPage = () => {
  const { country, device } = useSelector(
    (state: StateRoot) => state.appConfig
  );
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const isMobile = matchMobileDevice(device);
  const { topIdeaId } = useParams();
  const location = useLocation();
  const [topIdea, setTopIdea] = useState<?TopIdeaType>(undefined);
  const hasComments = topIdea && topIdea.comments.length > 0;

  // @todo remove or refactor when Municipales is over
  const withPersonalityHeader: boolean = checkIsFeatureActivated(
    MUNICIPAL_PERSONALITY_HEADER,
    question.activeFeatures
  );

  const parentPages: BreadcrumbsPagesType = [
    {
      name: i18n.t('idea_card.title'),
      link: getTopIdeasLink(country, question.slug),
    },
  ];
  const currentPage = {
    name: i18n.t('idea_details.current_page'),
    link: location,
  };

  const initTopIdea = async () => {
    const result = await TopIdeaService.getTopIdea(
      question.questionId,
      topIdeaId,
      () => redirectToNotFoundPage(country)
    );
    if (result) {
      const { questionTopIdea } = result;
      setTopIdea(questionTopIdea);
    }
  };

  useEffect(() => {
    initTopIdea().then(() => {
      trackDisplayTopIdeas('top-idea-details');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, topIdeaId]);

  return (
    <ThemeProvider theme={question.theme}>
      <MetaTags
        title={i18n.t('meta.top-idea-details.title', {
          idea: topIdea ? topIdea.name : '',
          question: question.question,
        })}
        description={i18n.t('meta.top-idea-details.description', {
          idea: topIdea ? topIdea.name : '',
          question: question.wording.question,
        })}
        picture={i18n.t('meta.top-idea-details.picture')}
      />
      <TopIdeaDetailsSkipLinks hasComments={hasComments} />
      <MobileDescriptionImage question={question} />
      <ConsultationHeaderWrapperStyle backgroundcolor={question.theme.color}>
        <IntroBanner question={question} />
      </ConsultationHeaderWrapperStyle>
      {/** @todo remove or refactor when Municipales is over */}
      {withPersonalityHeader && <CandidateEngagement question={question} />}
      <ConsultationPageWrapperStyle>
        <ConsultationSidebar question={question} />
        <ConsultationPageContentStyle id="main" data-cy-container="main">
          <ColumnElementStyle>
            <Breadcrumbs parentPages={parentPages} currentPage={currentPage} />
            {topIdea && <TopIdeaCard topIdea={topIdea} />}
          </ColumnElementStyle>
          {topIdea && (
            <>
              <TopIdeaDetailsComments comments={topIdea && topIdea.comments} />
              <TopIdeaDetailsProposals topIdea={topIdea} question={question} />
            </>
          )}
        </ConsultationPageContentStyle>
      </ConsultationPageWrapperStyle>
      {isMobile && <FollowUs question={question} />}
    </ThemeProvider>
  );
};

// default export needed for loadable component
export default TopIdeaDetailsPage; // eslint-disable-line import/no-default-export
