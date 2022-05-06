import React, { FC } from 'react';
import i18n from 'i18next';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { trackClickCitizenRegister } from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { Register } from '@make.org/components/Auth/Register';
import { setPanelContent } from '@make.org/store/actions/panel';
import {
  CitizenRegisterContentStyle,
  CitizenRegisterTitleStyle,
  CitizenRegisterSubtitleStyle,
  SocialCitizenRegisterWrapperStyle,
} from './style';

export const CitizenRegister: FC = () => {
  const { dispatch, state } = useAppContext();

  const handleClick = () => {
    dispatch(setPanelContent(<Register />));
    trackClickCitizenRegister();
  };

  const { isLoggedIn } = selectAuthentication(state);
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
