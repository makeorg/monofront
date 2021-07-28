import React from 'react';
import { i18n } from 'Shared/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { type StateRoot } from 'Shared/store/types';
import { selectAuthentication } from 'Shared/store/selectors/user.selector';
import { RedButtonStyle } from 'Client/ui/Elements/Buttons/V2/style';
import { modalShowRegister } from 'Shared/store/actions/modal';
import { trackClickCitizenRegister } from 'Shared/services/Tracking';
import {
  CitizenRegisterContentStyle,
  CitizenRegisterTitleStyle,
  CitizenRegisterSubtitleStyle,
  SocialCitizenRegisterWrapperStyle,
} from './style';

export const CitizenRegister = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(modalShowRegister());
    trackClickCitizenRegister();
  };

  const { isLoggedIn } = useSelector((state: StateRoot) =>
    selectAuthentication(state)
  );
  if (isLoggedIn) {
    return null;
  }

  return (
    <CitizenRegisterContentStyle>
      <CitizenRegisterTitleStyle>
        {i18n.t('consultation.citizen_account.title')}
      </CitizenRegisterTitleStyle>
      <CitizenRegisterSubtitleStyle>
        {i18n.t('consultation.citizen_account.description')}
      </CitizenRegisterSubtitleStyle>
      <SocialCitizenRegisterWrapperStyle>
        <RedButtonStyle onClick={handleClick}>
          {i18n.t('consultation.citizen_account.button_text')}
        </RedButtonStyle>
      </SocialCitizenRegisterWrapperStyle>
    </CitizenRegisterContentStyle>
  );
};
