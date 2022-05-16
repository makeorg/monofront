import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import {
  FormLeftAlignStyle,
  FormRequirementsStyle,
} from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { SubmitButton } from '@make.org/ui/components/SubmitButton';
import { useAppContext } from '@make.org/store';
import { throttle } from '@make.org/utils/helpers/throttle';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ConditionParagraphMarginStylePanel } from '@make.org/ui/elements/ParagraphElements';
import { RedButtonCenterStyle } from '@make.org/ui/elements/ButtonsElements';
import { OptInCheckBox } from '@make.org/components/Form/CheckBox/OptInCheckbox';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { isSupportedCountry } from '@make.org/utils/validator/postCode';
import { FormErrors } from '../../Form/Errors';
import {
  NewWindowIconStyle,
  RegisterEmailTitleStyle,
  TermsOfUseLinkGreyStyle,
  PostCodeWrapperStyle,
} from '../style';
import { EmailPasswordFields } from '../CommonFields/EmailPassword';
import { ExtraInRegisterformationsFields } from '../CommonFields/ExtraRegisterInformations';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  checkRegistration: () => void;
  disableSubmit: boolean;
  registerPanelStep: number;
};
/**
 * Renders Register Form
 */
export const RegisterFormPanel: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleCheckbox,
  handleSubmit,
  checkRegistration,
  disableSubmit,
  registerPanelStep,
}) => {
  const { state } = useAppContext();
  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';

  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);

  useEffect(() => {
    trackDisplaySignupForm(`${registerPanelStep}`);
  }, [registerPanelStep]);

  return (
    <FormLeftAlignStyle
      id={FORM.REGISTER_PANEL_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <RegisterEmailTitleStyle>
        {i18n.t('common.social_login.email_register')}{' '}
        {i18n.t('common.social_login.count_register', {
          count: registerPanelStep,
        })}
      </RegisterEmailTitleStyle>
      <FormRequirementsStyle>
        {registerPanelStep === 1
          ? i18n.t('common.form.requirements_short')
          : i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      {registerPanelStep === 1 && (
        <>
          <EmailPasswordFields
            emailValue={user.email}
            passwordValue={user.password}
            emailError={emailError}
            passwordError={passwordError}
            handleChange={handleChange}
          />
          <RedButtonCenterStyle
            onClick={checkRegistration}
            disabled={!user.password || !user.email}
          >
            {i18n.t('common.continue')}
          </RedButtonCenterStyle>
        </>
      )}
      {registerPanelStep === 2 && (
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
          {isSupportedCountry(country) && (
            <PostCodeWrapperStyle>
              {i18n.t('common.form.post_code')}
            </PostCodeWrapperStyle>
          )}
          <ConditionParagraphMarginStylePanel>
            {i18n.t('register.gtu_text_first')}
            <TermsOfUseLinkGreyStyle
              href={
                isWidget
                  ? `https://make.org${getGTUPageLink(country, language)}`
                  : getGTUPageLink(country, language)
              }
              target="_blank"
              rel="noopener"
            >
              {i18n.t('register.gtu_link')}
              <NewWindowIconStyle
                className="grey"
                aria-hidden
                focusable="false"
              />
              <ScreenReaderItemStyle>
                {i18n.t('common.open_new_window')}
              </ScreenReaderItemStyle>
            </TermsOfUseLinkGreyStyle>
          </ConditionParagraphMarginStylePanel>
          <RegisterCheckBox handleCheckbox={handleCheckbox} required />
          <OptInCheckBox handleCheckbox={handleCheckbox} />
          <SubmitButton
            formName={FORM.REGISTER_PANEL_FORMNAME}
            id="authentication-register-submit"
            label={i18n.t('common.register_label')}
            disabled={disableSubmit}
          />
        </>
      )}
    </FormLeftAlignStyle>
  );
};
