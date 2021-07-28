// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { type StateRoot } from 'Shared/store/types';
import { i18n } from 'Shared/i18n';
import { type QuestionType, type PartnerType } from 'Shared/types/question';
import { FourthLevelTitleStyle } from 'Client/ui/Elements/TitleElements';
import { ParagraphStyle } from 'Client/ui/Elements/ParagraphElements';
import { TileSeparatorStyle } from 'Client/ui/Elements/TileWithTitle/style';
import { getPartnerAnchor, getSequenceLink } from 'Shared/helpers/url';
import {
  trackClickLearnMore,
  trackOpenSequence,
} from 'Shared/services/Tracking';
import { COMPONENT_PARAM_SEQUENCE } from 'Shared/constants/tracking';
import { isInProgress } from 'Shared/helpers/date';
import { ParticipateButtonStyle } from 'Client/features/consultation/Styled/Partners';
import { SidebarNewWindowLink } from 'Client/features/consultation/Sidebar/Link';
import { ACTION_PARTNER } from 'Shared/constants/partner';
import { useSelector } from 'react-redux';
import { PartnersList } from './List';

type Props = {
  question: QuestionType,
};

export const Partners = ({ question }: Props) => {
  const { country } = useSelector((state: StateRoot) => state.appConfig);
  const sequenceLink = getSequenceLink(country, question.slug);

  const partners: PartnerType[] = question.partners
    ? question.partners.filter(
        partner => partner.partnerKind === ACTION_PARTNER
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
            onClick={() => trackOpenSequence(COMPONENT_PARAM_SEQUENCE)}
          >
            {i18n.t('common.participate')}
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
