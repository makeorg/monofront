import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import {
  FormCenterAlignStyle,
  FormRequirementsStyle,
} from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { SubmitButton } from '@make.org/ui/components/SubmitButton';
import { SubmitThumbsUpIcon } from '@make.org/utils/constants/icons';
import { useAppContext } from '@make.org/store';
import { throttle } from '@make.org/utils/helpers/throttle';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ConditionParagraphStylePanel } from '@make.org/ui/elements/ParagraphElements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { FormErrors } from '../../Form/Errors';
import {
  NewWindowIconStyle,
  RegisterEmailTitleStyle,
  PanelTermsOfUseLinkStyle,
} from '../style';
import { EmailPasswordFields } from '../CommonFields/EmailPassword';
import { ExtraInRegisterformationsFields } from '../CommonFields/ExtraRegisterInformations';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLegalField: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disableSubmit: boolean;
};
/**
 * Renders Register Form
 */
export const RegisterFormPanel: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleLegalField,
  handleSubmit,
  disableSubmit,
}) => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;
  const [step, setStep] = useState(1);

  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);

  useEffect(() => {
    trackDisplaySignupForm(`${step}`);
  }, [step]);

  return (
    <FormCenterAlignStyle
      id={FORM.REGISTER_PANEL_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <RegisterEmailTitleStyle>
        {i18n.t('common.social_login.email_register')}{' '}
        {i18n.t('common.social_login.count_register', { count: step })}
      </RegisterEmailTitleStyle>
      <FormRequirementsStyle>
        {i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      {step === 1 && (
        <>
          <EmailPasswordFields
            emailValue={user.email}
            passwordValue={user.password}
            emailError={emailError}
            passwordError={passwordError}
            handleChange={handleChange}
          />
          <RedButtonStyle
            onClick={() => setStep(2)}
            disabled={!user.password || !user.email}
          >
            {i18n.t('common.continue')}
          </RedButtonStyle>
        </>
      )}
      {step === 2 && (
        <>
          <ExtraInRegisterformationsFields
            firstnameValue={user.profile.firstname}
            ageValue={user.profile.age}
            postalcodeValue={user.profile.postalcode}
            firstnameError={firstnameError}
            ageError={ageError}
            postalcodeError={postalcodeError}
            handleChange={handleChange}
          />
          <ConditionParagraphStylePanel>
            <span>
              {i18n.t('register.gtu_text_first')}
              <PanelTermsOfUseLinkStyle
                href={getGTUPageLink(country, language)}
                target="_blank"
                rel="noopener"
              >
                {i18n.t('register.gtu_link')}
                <NewWindowIconStyle isGrey />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </PanelTermsOfUseLinkStyle>
            </span>
          </ConditionParagraphStylePanel>
          <RegisterCheckBox handleLegalField={handleLegalField} required />
          <SubmitButton
            formName={FORM.REGISTER_PANEL_FORMNAME}
            id="authentication-register-submit"
            icon={SubmitThumbsUpIcon}
            label={i18n.t('common.register_label')}
            disabled={disableSubmit}
          />
        </>
      )}
    </FormCenterAlignStyle>
  );
};
