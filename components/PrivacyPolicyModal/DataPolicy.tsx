import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { CheckBox } from '@make.org/components/Form/CheckBox';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { FORM } from '@make.org/types/enums';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { loginSocial, login } from '@make.org/store/actions/authentication';
import { modalCloseDataPolicy } from '@make.org/store/actions/modal';
import {
  DataPolicyNewWindowLinkStyle,
  NewWindowIconStyle,
} from '@make.org/ui/elements/FormElements';
import { throttle } from '@make.org/utils/helpers/throttle';
import { useAppContext } from '@make.org/store';
import {
  DataPolicyContentStyle,
  DataPolicyTitleStyle,
  DataPolicyParagraphStyle,
  ButtonWrapperStyle,
} from './style';

export const DataPolicy: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { country, language } = state.appConfig;
  const { isLogin, extraProps } = state.modal;
  const { email, password, provider, token } = extraProps;
  // eslint-disable-next-line no-unused-vars
  const [dataPolicyConsent, setDataPolicyConsent] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const handleCheck = (event: React.SyntheticEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDataPolicyConsent(!dataPolicyConsent);
    setCanSubmit(!canSubmit);
  };
  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (isLogin) {
      login(email, password, dataPolicyConsent, dispatch);
    } else {
      loginSocial(provider, token, dataPolicyConsent, dispatch);
    }
    dispatch(modalCloseDataPolicy());
  };

  useEffect(() => {
    const TwentyMinutesInMilliseconds = 20 * 60 * 1000;
    const timer = setTimeout(async () => {
      dispatch(modalCloseDataPolicy());
    }, TwentyMinutesInMilliseconds);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataPolicyContentStyle
      id={FORM.DATA_POLICY_CONSENT}
      onSubmit={throttle(handleSubmit)}
    >
      <DataPolicyTitleStyle>
        {i18n.t('data_policy_modal.title')}
      </DataPolicyTitleStyle>
      <DataPolicyParagraphStyle>
        {i18n.t('data_policy_modal.description')}
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
      </DataPolicyParagraphStyle>
      <CheckBox
        name="dataPolicyConsent"
        value={JSON.stringify(dataPolicyConsent)}
        handleCheck={handleCheck}
        label={
          <span
            dangerouslySetInnerHTML={{
              __html: i18n.t('data_policy_modal.consent'),
            }}
          />
        }
        isChecked={dataPolicyConsent}
        required
        isBlack
        noFontSizeChange
      />
      <ButtonWrapperStyle>
        <SubmitButton
          disabled={!canSubmit}
          formName={FORM.DATA_POLICY_CONSENT}
          label={i18n.t('data_policy_modal.validate')}
        />
      </ButtonWrapperStyle>
    </DataPolicyContentStyle>
  );
};
