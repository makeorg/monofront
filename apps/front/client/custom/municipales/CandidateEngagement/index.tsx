import React, { useEffect, useState, useRef, useLayoutEffect, FC } from 'react';
import {
  QuestionType,
  PersonalityType,
  SliderParamsType,
} from '@make.org/types';

import { fechQuestionPersonalities } from '@make.org/store/actions/questions';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  MiddleColumnStyle,
  CenterRowStyle,
  MiddleRowStyle,
} from '@make.org/ui/elements/FlexElements';
import { Avatar } from '@make.org/ui/components/Avatar';
import { Link } from 'react-router-dom';
import { getPersonalityProfileLink } from '@make.org/utils/helpers/url';

import i18n from 'i18next';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import {
  intToPx,
  matchMobileDevice,
  scrollToTop,
} from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickPublicProfile } from '@make.org/utils/services/Tracking';
import { TYPE_PERSONALITY } from '@make.org/utils/constants/user';
import { useAppContext } from '@make.org/store';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import {
  CandidateInformationsStyle,
  CandidateWrapperStyle,
  CandidateHeadingStyle,
  CandidateSeparatorStyle,
  CandidateTitleStyle,
  CandidateLinkStyle,
  CandidateListItemStyle,
  PoliticalPartyStyle,
} from './style';

declare global {
  interface Document {
    documentMode?: any;
  }
}

type Props = {
  question: QuestionType;
};
type SliderProps = {
  personalities: PersonalityType[];
};

type CandidateProps = {
  personality: PersonalityType;
};

const handleClickProfile = () => {
  scrollToTop();
  trackClickPublicProfile(TYPE_PERSONALITY);
};

export const CandidateItem: FC<CandidateProps> = ({ personality }) => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const personalityFullName = `${personality.firstName} ${personality.lastName}`;
  return (
    <CenterRowStyle as={isMobile ? MiddleColumnStyle : ''}>
      <Link
        to={getPersonalityProfileLink(country, personality.userId)}
        onClick={handleClickProfile}
      >
        <Avatar
          avatarUrl={personality.avatarUrl}
          avatarSize={isMobile ? 35 : 50}
          avatarAlt={i18n.t('consultation.partners.profile_link', {
            name: personalityFullName,
          })}
        />
      </Link>
      <CandidateInformationsStyle>
        <MiddleRowStyle>
          <CandidateLinkStyle
            to={getPersonalityProfileLink(country, personality.userId)}
            onClick={handleClickProfile}
          >
            {personalityFullName}
          </CandidateLinkStyle>
          <CertifiedIconStyle aria-hidden focusable="false" />
        </MiddleRowStyle>
        <PoliticalPartyStyle>{personality.politicalParty}</PoliticalPartyStyle>
      </CandidateInformationsStyle>
    </CenterRowStyle>
  );
};

export const CandidateMobileSlider: FC<SliderProps> = ({ personalities }) => {
  const sliderName = 'candidate_mobile';
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderParams: SliderParamsType = {
    slidesToShow: 'auto',
  };
  useSlider(sliderRef, sliderParams, personalities.length > 0);

  return (
    <div className={`${sliderName} glider-contain`}>
      <ScreenReaderItemStyle>
        {i18n.t('common.slider.introduction')}
      </ScreenReaderItemStyle>
      <div className={`${sliderName} glider`} ref={sliderRef}>
        <UnstyledListStyle className={`${sliderName} glider-track`}>
          {personalities.map(personality => (
            <CandidateListItemStyle
              key={personality.userId}
              className={sliderName}
            >
              <CandidateItem personality={personality} />
            </CandidateListItemStyle>
          ))}
        </UnstyledListStyle>
      </div>
    </div>
  );
};

export const CandidateDesktopSlider: FC<SliderProps> = ({ personalities }) => {
  const [slideOffset, setSlideOffset] = useState(0);
  const sliderName = 'candidate_desktop';
  const sliderRef = useRef<HTMLDivElement>(null);
  let sliderParams: any = {
    // TO DO
    responsive: [
      {
        breakpoint: Breakpoints.Tablet,
        settings: {
          slidesToShow: 'auto',
          draggable: true,
        },
      },
    ],
  };

  // Dirty Hack for IE11 compatibility :'(
  const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  if (isIE11) {
    sliderParams = {
      responsive: [
        {
          breakpoint: Breakpoints.Tablet,
          settings: {
            slidesToShow: 6.5,
            draggable: true,
          },
        },
      ],
    };
  }

  useSlider(sliderRef, sliderParams, personalities.length > 0);

  const updateSlideOffset = () => {
    const mainContainer = document.getElementById('main');
    const containerLeftOffset = mainContainer
      ? mainContainer.getBoundingClientRect().left
      : 0;

    setSlideOffset(containerLeftOffset);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      requestAnimationFrame(updateSlideOffset);
    });
    updateSlideOffset();
    return () =>
      window.removeEventListener('resize', () => {
        requestAnimationFrame(updateSlideOffset);
      });
  }, [personalities]);

  return (
    <div className={`${sliderName} glider-contain`}>
      <ScreenReaderItemStyle>
        {i18n.t('common.slider.introduction')}
      </ScreenReaderItemStyle>
      <div className={`${sliderName} glider`} ref={sliderRef}>
        <UnstyledListStyle className={`${sliderName} glider-track`}>
          <CandidateListItemStyle
            className={sliderName}
            paddingLeft={intToPx(slideOffset)}
          >
            <CandidateTitleStyle as="h2" id="candidate_position_title">
              {i18n.t('consultation.municipal.position.title')}
            </CandidateTitleStyle>
          </CandidateListItemStyle>
          {personalities.map(personality => (
            <CandidateListItemStyle
              key={personality.userId}
              className={sliderName}
            >
              <CandidateItem personality={personality} />
            </CandidateListItemStyle>
          ))}
        </UnstyledListStyle>
      </div>
    </div>
  );
};

export const CandidateEngagement: FC<Props> = ({ question }) => {
  const [personalities, setPersonalities] = useState(null);
  const { dispatch, state } = useAppContext();
  const personalitiesState: PersonalityType[] =
    state.questions[question.slug].personalities;
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);

  useEffect(() => {
    setPersonalities(personalitiesState);
  }, [personalitiesState]);

  useEffect(() => {
    dispatch(fechQuestionPersonalities(question.questionId, question.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  if (!personalities) {
    return null;
  }

  return (
    <CandidateWrapperStyle>
      <GliderStylesheet />
      {isMobile ? (
        <>
          <CandidateHeadingStyle>
            <FourthLevelTitleStyle>
              {i18n.t('consultation.municipal.position.title')}
            </FourthLevelTitleStyle>
            <CandidateSeparatorStyle />
          </CandidateHeadingStyle>
          <CandidateMobileSlider personalities={personalities} />
        </>
      ) : (
        <CandidateDesktopSlider personalities={personalities} />
      )}
    </CandidateWrapperStyle>
  );
};
