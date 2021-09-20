import React from 'react';
import i18n from 'i18next';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { modalCloseDataPolicy } from '@make.org/store/actions/modal';
import {
  DataPolicyNewWindowLinkStyle,
  NewWindowIconStyle,
} from '@make.org/ui/elements/FormElements';

import { useAppContext } from '@make.org/store';
import {
  DataPolicyContentStyle,
  DataPolicyTitleStyle,
  DataPolicyParagraphStyle,
  ButtonWrapperStyle,
  RefusalWhiteButtonStyle,
} from './style';

type Props = {
  toggleConfirmation: () => void;
};

export const RefusalConfirmation: React.FC<Props> = ({
  toggleConfirmation,
}) => {
  const { dispatch, state } = useAppContext();
  const { country, language } = state.appConfig;
  const handleClick = () => {
    toggleConfirmation();
  };
  const handleClose = () => {
    dispatch(modalCloseDataPolicy());
  };

  return (
    <>
      <DataPolicyContentStyle>
        <DataPolicyTitleStyle>
          {i18n.t('data_policy_modal.refusal_title')}
        </DataPolicyTitleStyle>
        <DataPolicyParagraphStyle isRefusal>
          {i18n.t('data_policy_modal.refusal_description_first_part')}
          <DataPolicyNewWindowLinkStyle
            href={getDataPageLink(country, language)}
            target="_blank"
            rel="noopener"
          >
            {i18n.t('legal_consent.privacy_policy')}
            <NewWindowIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </DataPolicyNewWindowLinkStyle>
          {i18n.t('data_policy_modal.refusal_description_second_part')}
        </DataPolicyParagraphStyle>
        <ButtonWrapperStyle>
          <RedButtonStyle type="button" onClick={handleClick}>
            {i18n.t('data_policy_modal.stay')}
          </RedButtonStyle>
          <RefusalWhiteButtonStyle type="button" onClick={handleClose}>
            {i18n.t('data_policy_modal.leave')}
          </RefusalWhiteButtonStyle>
        </ButtonWrapperStyle>
      </DataPolicyContentStyle>
    </>
  );
};
