// @flow
import React from 'react';
import { SvgLightBulb } from 'Client/ui/Svg/elements';
import { i18n } from 'Shared/i18n';
import { useDispatch } from 'react-redux';
import { setPanelContent } from 'Shared/store/reducers/panel/actions';
import { ProposalJourney } from 'Client/features/proposal/Submit/Journey';
import {
  CardStyle,
  CardTitleStyle,
  CardDescriptionStyle,
  CardButtonStyle,
} from './style';

export const SubmitProposal = () => {
  const dispatch = useDispatch();
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
