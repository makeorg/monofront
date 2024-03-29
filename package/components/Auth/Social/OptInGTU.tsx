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
import { ProposalBackButtonStyle } from '@make.org/components/Proposal/Submit/style';

import {
  NewWindowIconStyle,
  TermsOfUseLinkGreyStyle,
  RegisterPanelOptInWrapperStyle,
  LoginTitleWrapperCenterStyle,
  RegisterPanelSubTitleWrapperStyle,
} from '@make.org/components/Auth/style';

type Props = {
  handleSubmit: (acceptDataPolicy: boolean, optinNewsletter: boolean) => void;
  handleReturn: () => void;
};

export const OptInGTU: React.FC<Props> = ({ handleSubmit, handleReturn }) => {
  const { state } = useAppContext();

  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';
  const [acceptDataPolicy, setAcceptDataPolicy] = useState<boolean>(false);
  const [optinNewsletter, setOptinNewsletter] = useState<boolean>(false);

  return (
    <RegisterPanelOptInWrapperStyle
      as="form"
      id={FORM.DATA_POLICY_CONSENT}
      onSubmit={throttle(() => handleSubmit(acceptDataPolicy, optinNewsletter))}
    >
      <ProposalBackButtonStyle onClick={handleReturn}>
        {i18n.t('common.back')}
      </ProposalBackButtonStyle>
      <LoginTitleWrapperCenterStyle className="red">
        {i18n.t('common.register_panel.optin_cgu_title')}{' '}
      </LoginTitleWrapperCenterStyle>
      <RegisterPanelSubTitleWrapperStyle className="dark">
        {i18n.t('common.register_panel.optin_cgu_subtitle')}{' '}
      </RegisterPanelSubTitleWrapperStyle>
      <ConditionParagraphMarginStylePanel>
        {i18n.t('register.gtu_text_first')}{' '}
        <TermsOfUseLinkGreyStyle
          href={
            isWidget
              ? `https://make.org${getGTUPageLink(country, language)}`
              : getGTUPageLink(country, language)
          }
          target="_blank"
          rel="noopener"
        >
          {i18n.t('register.gtu_link')}{' '}
          <NewWindowIconStyle className="grey" aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}{' '}
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
