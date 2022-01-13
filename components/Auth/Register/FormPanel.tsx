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
import { ConditionParagraphBlackStylePanel } from '@make.org/ui/elements/ParagraphElements';
import { RedButtonCenterStyle } from '@make.org/ui/elements/ButtonsElements';
import { OptOutCheckBox } from '@make.org/components/Form/CheckBox/OptOutCheckbox';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { FormErrors } from '../../Form/Errors';
import {
  NewWindowIconStyle,
  RegisterEmailTitleStyle,
  TermsOfUseLinkBlackStyle,
  PostCodeWrapperStyle,
} from '../style';
import { EmailPasswordFields } from '../CommonFields/EmailPassword';
import { AgePostcode } from '../CommonFields/AgePostcode';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLegalField: (fieldName: string, value: boolean) => void;
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
  handleLegalField,
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
        {i18n.t('common.form.requirements_short')}
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
          <AgePostcode
            ageValue={user.profile.age}
            postalcodeValue={user.profile.postalcode}
            ageError={ageError}
            postalcodeError={postalcodeError}
            handleChange={handleChange}
          />
          <PostCodeWrapperStyle>
            {i18n.t('common.form.post_code')}
          </PostCodeWrapperStyle>
          <ConditionParagraphBlackStylePanel>
            {i18n.t('register.gtu_text_first')}
            <TermsOfUseLinkBlackStyle
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
            </TermsOfUseLinkBlackStyle>
          </ConditionParagraphBlackStylePanel>
          <RegisterCheckBox handleLegalField={handleLegalField} required />
          <OptOutCheckBox />
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
