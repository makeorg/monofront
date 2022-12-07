import React, { useState } from 'react';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { FORM } from '@make.org/types/enums';
import { SubmitButtonBottom } from '@make.org/ui/components/SubmitButton/submitButtonBottom';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ConditionParagraphMarginStylePanel } from '@make.org/ui/elements/ParagraphElements';
import { OptInCheckBox } from '@make.org/components/Form/CheckBox/OptInCheckbox';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import { throttle } from '@make.org/utils/helpers/throttle';
import { UserService } from '@make.org/utils/services/User';
import { setPanelContent } from '@make.org/store/actions/panel/';
import { Register } from '@make.org/components/Auth/Register';
import { ProposalBackButtonStyle } from '../../../Proposal/Submit/style';

import {
  NewWindowIconStyle,
  TermsOfUseLinkGreyStyle,
  RegisterPanelOptInWrapperStyle,
  LoginTitleWrapperCenterStyle,
  RegisterPanelSubTitleWrapperStyle,
} from '../../style';

type Props = {
  provider: string;
  token: string;
  success: (isNewAccount: boolean) => void;
  failure: () => void;
  unexpectedError: () => void;
};

export const OptInGTU: React.FC<Props> = ({
  provider,
  token,
  success,
  failure,
  unexpectedError,
}) => {
  const { dispatch, state } = useAppContext();

  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';
  const [acceptDataPolicy, setAcceptDataPolicy] = useState<boolean>(false);
  const [optinNewsletter, setOptinNewsletter] = useState<boolean>(false);

  const handleSubmit = () => {
    UserService.loginSocial(
      provider,
      token,
      acceptDataPolicy,
      optinNewsletter,
      success,
      failure,
      unexpectedError
    );
  };

  const handleReturn = () => {
    dispatch(setPanelContent(<Register />));
  };

  return (
    <RegisterPanelOptInWrapperStyle
      as="form"
      id={FORM.DATA_POLICY_CONSENT}
      onSubmit={throttle(handleSubmit)}
    >
      <ProposalBackButtonStyle onClick={handleReturn}>
        <>{i18n.t('common.back')}</>
      </ProposalBackButtonStyle>
      <LoginTitleWrapperCenterStyle className="red">
        <>{i18n.t('common.register_panel.optin_cgu_title')}</>{' '}
      </LoginTitleWrapperCenterStyle>
      <RegisterPanelSubTitleWrapperStyle className="dark">
        <>{i18n.t('common.register_panel.optin_cgu_subtitle')}</>{' '}
      </RegisterPanelSubTitleWrapperStyle>
      <ConditionParagraphMarginStylePanel>
        <>{i18n.t('register.gtu_text_first')}</>{' '}
        <TermsOfUseLinkGreyStyle
          href={
            isWidget
              ? `https://make.org${getGTUPageLink(country, language)}`
              : getGTUPageLink(country, language)
          }
          target="_blank"
          rel="noopener"
        >
          <>{i18n.t('register.gtu_link')}</>{' '}
          <NewWindowIconStyle className="grey" aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            <>{i18n.t('common.open_new_window')}</>{' '}
          </ScreenReaderItemStyle>
        </TermsOfUseLinkGreyStyle>
      </ConditionParagraphMarginStylePanel>
      <RegisterCheckBox
        handleCheckbox={() => {
          setAcceptDataPolicy(!acceptDataPolicy);
        }}
        required
      />
      <OptInCheckBox
        handleCheckbox={() => {
          setOptinNewsletter(!optinNewsletter);
        }}
      />
      <SubmitButtonBottom
        formName={FORM.DATA_POLICY_CONSENT}
        id="authentication-register-submit"
        label={i18n.t('common.register_label')}
        disabled={!acceptDataPolicy}
      />
    </RegisterPanelOptInWrapperStyle>
  );
};
