// @flow
import React, { FC, useEffect, useState } from 'react';
import { redirectToNotFoundPage } from '@make.org/utils/helpers/url';
import { QuestionType, TopIdeaType } from '@make.org/types';

import { TopIdeaService } from '@make.org/utils/services/TopIdea';
import { trackDisplayTopIdeas } from '@make.org/utils/services/Tracking';
import { FollowUs } from '@make.org/components/Flipping/FollowUs';
import i18n from 'i18next';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { MUNICIPAL_PERSONALITY_HEADER } from '@make.org/utils/constants/featureFlipping';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';

import { ThemeProvider } from 'styled-components';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { MobileDescriptionImage } from '../../app/Consultation/MobileDescriptionImage';
import { TopIdeasSkipLinks } from '../../app/SkipLinks/TopIdeas';
import { ConsultationSidebar } from '../../app/Consultation/Sidebar';
import { MetaTags } from '../../app/MetaTags';
import { CandidateEngagement } from '../../custom/municipales/CandidateEngagement';
import { TopIdeaCard } from '../../app/TopIdeas/Card';
import { IntroBanner } from '../../app/Consultation/IntroBanner/index';
import {
  ConsultationPageContentStyle,
  ConsultationPageWrapperStyle,
  TopIdeasPageTitleStyle,
  TopIdeasListStyle,
  TopIdeasListItemStyle,
  ConsultationHeaderWrapperStyle,
} from './style';

const TopIdeasPage: FC = () => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
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
      <ConsultationHeaderWrapperStyle
        backgroundcolor={question.theme.color || ''}
      >
        <IntroBanner question={question} />
      </ConsultationHeaderWrapperStyle>
      {/** @todo remove or refactor when Municipales is over */}
      {withPersonalityHeader && <CandidateEngagement question={question} />}
      <ConsultationPageWrapperStyle isGreatCause={false}>
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
