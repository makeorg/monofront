import React, { FC } from 'react';
import { SvgLightBulb } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import { useAppContext } from '@make.org/store';
import {
  CardStyle,
  CardTitleStyle,
  CardDescriptionStyle,
  CardButtonStyle,
} from './style';

export const SubmitProposal: FC = () => {
  const { dispatch } = useAppContext();
  return (
    <CardStyle className="margin-bottom">
      <SvgLightBulb aria-hidden width={31} height={31} focusable="false" />
      <CardTitleStyle>
        {i18n.t('consultation.cards.submit.title')}
      </CardTitleStyle>
      <CardDescriptionStyle>
        {i18n.t('consultation.cards.submit.description')}
      </CardDescriptionStyle>
      <CardButtonStyle
        onClick={() => dispatch(setPanelContent(<ProposalJourney />))}
      >
        {i18n.t('consultation.cards.submit.button')}
      </CardButtonStyle>
    </CardStyle>
  );
};
