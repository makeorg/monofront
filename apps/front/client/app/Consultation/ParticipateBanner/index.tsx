// @flow
import React from 'react';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import { getSequenceLink } from 'Shared/helpers/url';
import { i18n } from 'Shared/i18n';
import { Link } from 'react-router-dom';
import { trackOpenSequence } from 'Shared/services/Tracking';
import { COMPONENT_PARAM_SEQUENCE } from 'Shared/constants/tracking';
import { LinkAsRedButton } from 'Client/ui/Elements/LinkElements';
import {
  ParticipateWrapperStyle,
  ParticipateInnerStyle,
  ParticipateSeparatorStyle,
  ParticipateIntroductionStyle,
} from 'Client/features/consultation/Styled/ParticipateBanner';
import { useSelector } from 'react-redux';
import { matchMobileDevice } from 'Shared/helpers/styled';

type Props = {
  question: QuestionType,
};

export const ParticipateBanner = ({ question }: Props) => {
  const { country, device } = useSelector(
    (state: StateRoot) => state.appConfig
  );
  const isMobile = matchMobileDevice(device);
  const sequenceLink = getSequenceLink(country, question.slug);

  return (
    <ParticipateWrapperStyle aria-labelledby="participate_aside_title">
      <ParticipateInnerStyle>
        <ParticipateIntroductionStyle id="participate_aside_title" as="p">
          {i18n.t('consultation.banner.title')}
        </ParticipateIntroductionStyle>
        {!isMobile && <ParticipateSeparatorStyle />}
        <LinkAsRedButton
          as={Link}
          to={sequenceLink}
          onClick={() => trackOpenSequence(COMPONENT_PARAM_SEQUENCE)}
        >
          {i18n.t('common.participate')}
        </LinkAsRedButton>
      </ParticipateInnerStyle>
    </ParticipateWrapperStyle>
  );
};
