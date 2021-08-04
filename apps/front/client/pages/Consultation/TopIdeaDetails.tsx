// @flow
import React, { FC, useEffect, useState } from 'react';
import {
  getTopIdeasLink,
  redirectToNotFoundPage,
} from '@make.org/utils/helpers/url';
import { useParams, useLocation } from 'react-router-dom';
import { QuestionType, TopIdeaType } from '@make.org/types';

import { trackDisplayTopIdeas } from '@make.org/utils/services/Tracking';
import { FollowUs } from '@make.org/components/Flipping/FollowUs';
import { TopIdeaService } from '@make.org/utils/services/TopIdea';
import i18n from 'i18next';

import { FEATURE_FLIPPING } from '@make.org/types/enums';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { ThemeProvider } from 'styled-components';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { CandidateEngagement } from '../../custom/municipales/CandidateEngagement';
import { TopIdeaDetailsComments } from '../../app/TopIdeas/Comments';
import { TopIdeaDetailsProposals } from '../../app/TopIdeas/Proposals';
import { TopIdeaCard } from '../../app/TopIdeas/Card';
import { TopIdeaDetailsSkipLinks } from '../../app/SkipLinks/TopIdeaDetails';
import { MetaTags } from '../../app/MetaTags';
import { MobileDescriptionImage } from '../../app/Consultation/MobileDescriptionImage';
import { ConsultationSidebar } from '../../app/Consultation/Sidebar';
import {
  BreadcrumbsPagesType,
  Breadcrumbs,
} from '../../app/Breadcrumbs/DeprecatedBreadcrumbs';
import { IntroBanner } from '../../app/Consultation/IntroBanner/index';
import {
  ConsultationPageContentStyle,
  ConsultationPageWrapperStyle,
  ConsultationHeaderWrapperStyle,
} from './style';

const TopIdeaDetailsPage: FC = () => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
  const isMobile = matchMobileDevice(device);
  const { topIdeaId } = useParams<{ topIdeaId: string }>();
  const location = useLocation();
  const [topIdea, setTopIdea] = useState<TopIdeaType | null>(null);
  const hasComments = !!topIdea && topIdea.comments.length > 0;

  // @todo remove or refactor when Municipales is over
  const withPersonalityHeader: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.MUNICIPAL_PERSONALITY_HEADER,
    question.activeFeatures
  );

  const parentPages: BreadcrumbsPagesType[] = [
    {
      name: i18n.t('idea_card.title'),
      link: getTopIdeasLink(country, question.slug),
    },
  ];
  const currentPage = {
    name: i18n.t('idea_details.current_page'),
    link: location.pathname,
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
      <ConsultationHeaderWrapperStyle
        backgroundcolor={question.theme.color || ''}
      >
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
