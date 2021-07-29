import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import { getSequenceLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { Link } from 'react-router-dom';
import { trackOpenSequence } from '@make.org/utils/services/Tracking';
import { COMPONENT_PARAM_SEQUENCE } from '@make.org/utils/constants/tracking';
import { LinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import {
  ParticipateWrapperStyle,
  ParticipateInnerStyle,
  ParticipateSeparatorStyle,
  ParticipateIntroductionStyle,
} from '../Styled/ParticipateBanner';

type Props = {
  question: QuestionType;
};

export const ParticipateBanner: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
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
