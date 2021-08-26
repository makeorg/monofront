import React, { useEffect, FC } from 'react';
import { QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ThemeProvider } from 'styled-components';
import { NOTIF, IDS, FEATURE_FLIPPING, TRACKING } from '@make.org/types/enums';
import { SvgLightning, SvgLike, SvgPeople } from '@make.org/ui/Svg/elements';
import {
  getSequenceLink,
  getSequenceControversialLink,
  getSequencePopularLink,
} from '@make.org/utils/helpers/url';

import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  trackDisplayOperationPage,
  trackOpenSequence,
} from '@make.org/utils/services/Tracking';

import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { Keywords } from '@make.org/components/Flipping/Keywords';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';

import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { Timeline } from '../../app/Consultation/Timeline';
import { FeaturedProposals } from '../../app/Consultation/Cards/FeaturedProposals';
import { ParticipateNavigation } from '../../app/Consultation/Navigation/Participate';
import { DesktopAbout, MobileAbout } from '../../app/Consultation/Cards/About';
import { CTAProposal } from '../../app/Consultation/Cards/CTAProposal';
import { SocialSharing } from '../../app/Consultation/Cards/SocialSharing';
import { CTAMonoBlock } from '../../app/Consultation/Cards/CTAMonoblock';
import { SubmitProposal } from '../../app/Consultation/Cards/SubmitProposal';
import { ParticipateHighlights } from '../../app/Consultation/Highlights';
import { ParticipateHeader } from '../../app/Consultation/Header';
import { CitizenRegister } from '../../app/Consultation/CitizenRegister';
import {
  ParticipateContentStyle,
  ParticipateInnerStyle,
  ParticipateMainContentStyle,
  ParticipateSidebarContentStyle,
  ParticipateDescriptionStyle,
  ParticipateTitleStyle,
  ParticipateCTAProposalBloc,
} from './style';

const ParticipatePage: FC = () => {
  const { state, dispatch } = useAppContext();
  const { country, device } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
  const isDesktop = matchDesktopDevice(device);
  const PROPOSALS_THRESOLD = 5;

  useEffect(() => {
    if (!question.canPropose) {
      dispatch(
        displayNotificationBanner(
          NOTIF.VOTE_ONLY_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_INFORMATION,
          { questionId: question.questionId },
          true
        )
      );
    }
  }, [question, dispatch]);

  useEffect(() => {
    trackDisplayOperationPage();
  }, []);

  const InteractIcon = (
    <SvgPeople aria-hidden width={36} height={36} focusable="false" />
  );

  const ControversyIcon = (
    <SvgLightning
      fill="#f7b500"
      aria-hidden
      width={20}
      height={32}
      focusable="false"
    />
  );

  const PopularIcon = (
    <SvgLike
      fill="#de1a42"
      aria-hidden
      width={28}
      height={28}
      focusable="false"
    />
  );

  const isKeywordActive: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.CONSULTATION_KEYWORD_ACTIVE,
    question.activeFeatures
  );

  return (
    <ThemeProvider theme={question.theme}>
      <MetaTags
        title={i18n.t('meta.participate.title', {
          question: question.wording.question,
        })}
        description={i18n.t('meta.participate.description')}
        picture={question.wording.metas.picture}
      />
      <ParticipateHeader />
      {!isDesktop && <MobileAbout />}
      <ParticipateHighlights />
      <div id={IDS.CONSULTATION_NAVIGATION} />
      <ParticipateNavigation />
      <ParticipateContentStyle>
        <ParticipateTitleStyle>
          {i18n.t('consultation.participate.title')}
        </ParticipateTitleStyle>
        <ParticipateDescriptionStyle>
          {i18n.t('consultation.participate.description')}
        </ParticipateDescriptionStyle>
        <ParticipateInnerStyle>
          <ParticipateMainContentStyle>
            {question.canPropose && <SubmitProposal />}
            <CTAMonoBlock
              icon={InteractIcon}
              title={i18n.t('consultation.cards.interact.title')}
              description={i18n.t('consultation.cards.interact.description')}
              linkText={i18n.t('consultation.cards.interact.button')}
              linkHref={getSequenceLink(country, question.slug, {
                introCard: false,
              })}
              classes="margin-bottom"
              onClickAction={() =>
                trackOpenSequence(TRACKING.COMPONENT_PARAM_SEQUENCE)
              }
            />
            <ColumnToRowElementStyle>
              <ParticipateCTAProposalBloc isKeywordActive={isKeywordActive}>
                <CTAProposal
                  icon={ControversyIcon}
                  title={i18n.t('consultation.cards.controversy.title')}
                  description={i18n.t(
                    'consultation.cards.controversy.description'
                  )}
                  proposalCount={question.controversyCount}
                  thresold={PROPOSALS_THRESOLD}
                  linkText={i18n.t('consultation.cards.controversy.button')}
                  linkHref={getSequenceControversialLink(
                    country,
                    question.slug,
                    {
                      introCard: false,
                      pushProposal: false,
                    }
                  )}
                  classes="margin-bottom desktop-padding-right"
                  isKeywordActive={isKeywordActive}
                  onClickAction={() =>
                    trackOpenSequence(
                      TRACKING.COMPONENT_PARAM_SEQUENCE_CONTROVERSIAL
                    )
                  }
                />
                <CTAProposal
                  icon={PopularIcon}
                  title={i18n.t('consultation.cards.popular.title')}
                  description={i18n.t('consultation.cards.popular.description')}
                  proposalCount={question.topProposalCount}
                  thresold={PROPOSALS_THRESOLD}
                  linkText={i18n.t('consultation.cards.popular.button')}
                  linkHref={getSequencePopularLink(country, question.slug, {
                    introCard: false,
                    pushProposal: false,
                  })}
                  classes="margin-bottom desktop-padding-left"
                  isKeywordActive={isKeywordActive}
                  onClickAction={() =>
                    trackOpenSequence(TRACKING.COMPONENT_PARAM_SEQUENCE_POPULAR)
                  }
                />
              </ParticipateCTAProposalBloc>
              <Keywords question={question} isKeywordActive={isKeywordActive} />
            </ColumnToRowElementStyle>
            {isDesktop && <SocialSharing />}
          </ParticipateMainContentStyle>
          <ParticipateSidebarContentStyle>
            {isDesktop && <DesktopAbout />}
            <FeaturedProposals question={question} />
          </ParticipateSidebarContentStyle>
          {!isDesktop && <SocialSharing />}
        </ParticipateInnerStyle>
      </ParticipateContentStyle>
      <Timeline />
      <ParticipateContentStyle as="aside">
        <CitizenRegister />
      </ParticipateContentStyle>
    </ThemeProvider>
  );
};

// default export needed for loadable component
export default ParticipatePage; // eslint-disable-line import/no-default-export
