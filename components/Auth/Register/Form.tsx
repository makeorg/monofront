import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import { OptOutCheckBox } from '@make.org/components/Form/CheckBox/OptOutCheckbox';
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
import { ConditionParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { trackDisplaySignupForm } from '@make.org/utils/services/Tracking';
import { FormErrors } from '../../Form/Errors';
import { TermsOfUseLinkStyle, NewWindowIconStyle } from '../style';
import { EmailPasswordFields } from '../CommonFields/EmailPassword';
import { ExtraInRegisterformationsFields } from '../CommonFields/ExtraRegisterInformations';

type Props = {
  user: RegisterFormDataType;
  errors: ErrorObjectType[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  disableSubmit: boolean;
};
/**
 * Renders Register Form
 */
export const RegisterForm: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleCheckbox,
  handleSubmit,
  disableSubmit,
}) => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;

  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);

  useEffect(() => {
    trackDisplaySignupForm('modal');
  }, []);

  return (
    <FormCenterAlignStyle
      id={FORM.REGISTER_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <FormRequirementsStyle>
        {i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      <EmailPasswordFields
        emailValue={user.email}
        passwordValue={user.password}
        emailError={emailError}
        passwordError={passwordError}
        handleChange={handleChange}
      />
      <ExtraInRegisterformationsFields
        firstnameValue={user.profile.firstname}
        ageValue={user.profile.age}
        postalcodeValue={user.profile.postalcode}
        firstnameError={firstnameError}
        ageError={ageError}
        postalcodeError={postalcodeError}
        handleChange={handleChange}
      />
      <ConditionParagraphStyle>
        <span>
          {i18n.t('register.gtu_text_first')}
          <TermsOfUseLinkStyle
            href={getGTUPageLink(country, language)}
            target="_blank"
            rel="noopener"
          >
            {i18n.t('register.gtu_link')}
            <NewWindowIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </TermsOfUseLinkStyle>
        </span>
      </ConditionParagraphStyle>
      <RegisterCheckBox handleCheckbox={handleCheckbox} required />
      <OptOutCheckBox handleCheckbox={handleCheckbox} />
      <SubmitButton
        formName={FORM.REGISTER_FORMNAME}
        id="authentication-register-submit"
        icon={SubmitThumbsUpIcon}
        label={i18n.t('common.register_label')}
        disabled={disableSubmit}
      />
    </FormCenterAlignStyle>
  );
};
