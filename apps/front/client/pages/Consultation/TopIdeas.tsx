// @flow
import React, { useEffect, useState } from 'react';
import { redirectToNotFoundPage } from 'Shared/helpers/url';
import { useSelector } from 'react-redux';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import { type TopIdeaType } from 'Shared/types/topIdea';
import { IntroBanner } from 'Client/features/consultation/IntroBanner/index';
import { TopIdeaService } from 'Shared/services/TopIdea';
import { trackDisplayTopIdeas } from 'Shared/services/Tracking';
import { FollowUs } from 'Client/features/flipping/FollowUs';
import { i18n } from 'Shared/i18n';
import { TopIdeaCard } from 'Client/features/topIdeas/Card';
import { Spinner } from 'Client/ui/Elements/Loading/Spinner';
import { MUNICIPAL_PERSONALITY_HEADER } from 'Shared/constants/featureFlipping';
import { CandidateEngagement } from 'Client/custom/municipales/CandidateEngagement';
import { checkIsFeatureActivated } from 'Client/helper/featureFlipping';
import { MetaTags } from 'Client/app/MetaTags';
import { ConsultationSidebar } from 'Client/features/consultation/Sidebar';
import { TopIdeasSkipLinks } from 'Client/app/SkipLinks/TopIdeas';

import { MobileDescriptionImage } from 'Client/features/consultation/MobileDescriptionImage';
import { ThemeProvider } from 'styled-components';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { matchMobileDevice } from 'Shared/helpers/styled';
import {
  ConsultationPageContentStyle,
  ConsultationPageWrapperStyle,
  TopIdeasPageTitleStyle,
  TopIdeasListStyle,
  TopIdeasListItemStyle,
  ConsultationHeaderWrapperStyle,
} from './style';

const TopIdeasPage = () => {
  const { country, device } = useSelector(
    (state: StateRoot) => state.appConfig
  );
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const isMobile = matchMobileDevice(device);
  const [topIdeas, setTopIdeas] = useState<TopIdeaType[]>([]);
  const hasTopIdeas = topIdeas && topIdeas.length > 0;
  // @todo remove or refactor when Municipales is over
  const withPersonalityHeader: boolean = checkIsFeatureActivated(
    MUNICIPAL_PERSONALITY_HEADER,
    question.activeFeatures
  );
  const initTopIdeas = async () => {
    const results = await TopIdeaService.getTopIdeas(question.questionId, () =>
      redirectToNotFoundPage(country)
    );
    setTopIdeas(results || topIdeas);
  };

  useEffect(() => {
    initTopIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    trackDisplayTopIdeas('top-ideas');
  }, []);

  return (
    <ThemeProvider theme={question.theme}>
      <MetaTags
        title={i18n.t('meta.top-ideas.title', {
          question: question.wording.question,
        })}
        description={i18n.t('meta.top-ideas.description', {
          question: question.wording.question,
        })}
        picture={i18n.t('meta.top-ideas.picture')}
      />
      <TopIdeasSkipLinks />
      <MobileDescriptionImage question={question} />
      <ConsultationHeaderWrapperStyle backgroundcolor={question.theme.color}>
        <IntroBanner question={question} />
      </ConsultationHeaderWrapperStyle>
      {/** @todo remove or refactor when Municipales is over */}
      {withPersonalityHeader && <CandidateEngagement question={question} />}
      <ConsultationPageWrapperStyle>
        <ConsultationSidebar question={question} />
        <ConsultationPageContentStyle id="main" data-cy-container="main">
          <TopIdeasPageTitleStyle>
            {i18n.t('idea_card.title')}
          </TopIdeasPageTitleStyle>
          <TopIdeasListStyle>
            {hasTopIdeas ? (
              topIdeas.map((topIdea, index) => (
                <TopIdeasListItemStyle key={topIdea.id}>
                  <TopIdeaCard
                    position={index + 1}
                    topIdea={topIdea}
                    withDetails
                  />
                </TopIdeasListItemStyle>
              ))
            ) : (
              <Spinner />
            )}
          </TopIdeasListStyle>
        </ConsultationPageContentStyle>
      </ConsultationPageWrapperStyle>
      {isMobile && <FollowUs question={question} />}
    </ThemeProvider>
  );
};

// default export needed for loadable component
export default TopIdeasPage; // eslint-disable-line import/no-default-export
