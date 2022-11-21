import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import { QuestionType, PartnerType } from '@make.org/types';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { TileSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { getPartnerAnchor, getSequenceLink } from '@make.org/utils/helpers/url';
import {
  trackClickLearnMore,
  trackOpenSequence,
} from '@make.org/utils/services/Tracking';
import { TRACKING, PARTNER } from '@make.org/types/enums';

import { isInProgress } from '@make.org/utils/helpers/date';

import { useAppContext } from '@make.org/store';
import { ParticipateButtonStyle } from '../../Styled/Partners';
import { SidebarNewWindowLink } from '../Link';
import { PartnersList } from './List';

type Props = {
  question: QuestionType;
};

export const Partners: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const sequenceLink = getSequenceLink(country, question.slug);

  const partners: PartnerType[] = question.partners
    ? question.partners.filter(
        partner => partner.partnerKind === PARTNER.ACTION_PARTNER
      )
    : [];

  return (
    <>
      {isInProgress(question) && (
        <>
          <ParagraphStyle>
            {i18n.t('consultation.partners.intro_text')}
          </ParagraphStyle>
          <ParticipateButtonStyle
            as={Link}
            to={sequenceLink}
            onClick={() => trackOpenSequence(TRACKING.COMPONENT_PARAM_SEQUENCE)}
          >
            <>{i18n.t('common.participate')}</>
          </ParticipateButtonStyle>
          <FourthLevelTitleStyle as="h3">
            {i18n.t('consultation.partners.commitment_title')}
          </FourthLevelTitleStyle>
          <TileSeparatorStyle />
        </>
      )}
      <ParagraphStyle>
        {i18n.t('consultation.partners.commitment_text')}
      </ParagraphStyle>
      {partners && <PartnersList partners={partners} />}
      <SidebarNewWindowLink
        linkUrl={getPartnerAnchor(question.aboutUrl)}
        linkText={i18n.t('consultation.partners.commitment_link')}
        tracking={() => trackClickLearnMore()}
      />
    </>
  );
};
