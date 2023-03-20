import React, { useState, useEffect } from 'react';
import i18n from 'i18next';
import { CheckBox } from '@make.org/components/Form/CheckBox';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { FORM, NOTIF } from '@make.org/types/enums';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  getUser,
  loginSuccess,
  loginFailure,
  loginRequest,
  loginSocialRequest,
  loginSocialFailure,
  loginSocialSuccess,
} from '@make.org/store/actions/authentication';
import { modalCloseDataPolicy } from '@make.org/store/actions/modal';
import {
  DataPolicyNewWindowLinkStyle,
  NewWindowIconStyle,
} from '@make.org/ui/elements/FormElements';
import { throttle } from '@make.org/utils/helpers/throttle';
import { useAppContext } from '@make.org/store';
import {
  trackAuthenticationSocialFailure,
  trackAuthenticationSocialSuccess,
  trackLoginEmailFailure,
  trackLoginEmailSuccess,
} from '@make.org/utils/services/Tracking';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { UserService } from '@make.org/utils/services/User';
import { Logger } from '@make.org/utils/services/Logger';
import { ProposalService } from '@make.org/utils/services/Proposal';
import {
  closePanel,
  removePanelContent,
  setPanelContent,
} from '@make.org/store/actions/panel';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import {
  DataPolicyContentStyle,
  DataPolicyTitleStyle,
  DataPolicyParagraphStyle,
  ButtonWrapperStyle,
} from './style';

export const DataPolicy: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { country, language, source } = state.appConfig;
  const { isLogin, extraProps } = state.modal;
  const { pendingProposal } = state.pendingProposal;
  const question = selectCurrentQuestion(state);
  const { email, password, provider, token } = extraProps;
  // eslint-disable-next-line no-unused-vars
  const [dataPolicyConsent, setDataPolicyConsent] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const isWidget = source === 'widget';
  const handleCheck = (event: React.SyntheticEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDataPolicyConsent(!dataPolicyConsent);
    setCanSubmit(!canSubmit);
  };

  const commonSuccess = async (): Promise<void> => {
    getUser(dispatch, true);
    dispatch(
      displayNotificationBanner(
        NOTIF.LOGIN_SUCCESS_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_SUCCESS
      )
    );
    if (pendingProposal && question) {
      await ProposalService.propose(
        pendingProposal,
        question.questionId,
        question.returnedLanguage,
        country,
        () => dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_SUCCESS))
      );
    }

    dispatch(modalCloseDataPolicy());
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  const loginAuthSuccess = (): void => {
    dispatch(loginSuccess());
    trackLoginEmailSuccess();
    commonSuccess();
  };

  const loginAuthFailure = (): void => {
    dispatch(
      loginFailure({
        field: 'email',
        key: 'email_doesnot_exist',
        message: i18n.t('login.email_doesnot_exist', {
          emailLabel: `<label for="email">${i18n.t(
            'common.form.label.email'
          )}</label>`,
          passwordLabel: `<label for="password">${i18n.t(
            'common.form.label.password'
          )}</label>`,
        }),
      })
    );
    trackLoginEmailFailure();
    dispatch(modalCloseDataPolicy());
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  const socialAuthSuccess = (isNewAccount: boolean) => {
    dispatch(loginSocialSuccess());
    trackAuthenticationSocialSuccess(provider, isNewAccount);
    commonSuccess();
  };

  const socialAuthFailure = () => {
    dispatch(loginSocialFailure());
    trackAuthenticationSocialFailure(provider, 'Login social failure');
    dispatch(modalCloseDataPolicy());
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (isLogin) {
      dispatch(loginRequest());
      await UserService.login(
        email,
        password,
        dataPolicyConsent,
        loginAuthSuccess,
        loginAuthFailure
      );
    } else {
      dispatch(loginSocialRequest(provider));
      if (!token) {
        dispatch(loginSocialFailure());
        const tokenError = `No token from ${provider} callBack auth`;
        trackAuthenticationSocialFailure(provider, tokenError);
        Logger.logInfo({
          message: tokenError,
          name: 'social-auth',
        });
      }

      UserService.loginSocial(
        provider,
        token,
        dataPolicyConsent,
        undefined,
        socialAuthSuccess,
        socialAuthFailure
      );
    }
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
        {i18n.t('data_policy_modal.title')}{' '}
      </DataPolicyTitleStyle>
      <DataPolicyParagraphStyle>
        {i18n.t('data_policy_modal.description')}{' '}
        <DataPolicyNewWindowLinkStyle
          href={
            isWidget
              ? `https://make.org${getDataPageLink(country, language)}`
              : getDataPageLink(country, language)
          }
          target="_blank"
          rel="noopener"
        >
          {i18n.t('legal_consent.privacy_policy')}{' '}
          <NewWindowIconStyle aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}{' '}
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
