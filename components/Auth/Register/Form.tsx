import React, { ChangeEvent, FormEvent } from 'react';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import {
  FormCenterAlignStyle,
  FormRequirementsStyle,
} from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import { NumberInput } from '@make.org/components/Form/NumberInput';
import { PasswordInput } from '@make.org/components/Form/PasswordInput';
import { FORM } from '@make.org/types/enums';
import { SubmitButton } from '@make.org/ui/components/SubmitButton';
import {
  EmailFieldIcon,
  PasswordFieldIcon,
  NameFiledIcon,
  AgeFieldIcon,
  PostalCodeFieldIcon,
  JobFieldIcon,
  SubmitThumbsUpIcon,
} from '@make.org/utils/constants/icons';
import { useAppContext } from '@make.org/store';
import { throttle } from '@make.org/utils/helpers/throttle';
import { CustomPatternInput } from '@make.org/components/Form/CustomPatternInput';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import * as postCodeValidator from '@make.org/utils/validator/postCode';
import { ConditionParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { FormErrors } from '../../Form/Errors';
import { TermsOfUseLinkStyle, NewWindowIconStyle } from '../style';

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
export const RegisterForm: React.FC<Props> = ({
  user,
  errors,
  handleChange,
  handleLegalField,
  handleSubmit,
  disableSubmit,
}) => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;
  const { currentQuestion } = state;

  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);
  // @todo remove after territoires consultation is over
  const isPostalCodeRequired = currentQuestion === 'territoires';
  const postalCodeLabel = i18n.t('common.form.label.postalcode', {
    context: !isPostalCodeRequired && 'optional',
  });

  return (
    <FormCenterAlignStyle
      id={FORM.REGISTER_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <FormRequirementsStyle>
        {i18n.t('common.form.requirements')}
      </FormRequirementsStyle>
      <FormErrors errors={errors} />
      <UntypedInput
        type="email"
        name="email"
        id="email"
        icon={EmailFieldIcon}
        value={user.email}
        label={i18n.t('common.form.label.email')}
        required
        error={emailError}
        handleChange={handleChange}
      />
      <PasswordInput
        name="password"
        icon={PasswordFieldIcon}
        value={user.password}
        error={passwordError}
        label={i18n.t('common.form.label.password')}
        handleChange={handleChange}
      />
      <UntypedInput
        type="text"
        name="firstname"
        id="profile.firstname"
        icon={NameFiledIcon}
        error={firstnameError}
        value={user.profile.firstname}
        label={i18n.t('common.form.label.firstname')}
        required
        handleChange={handleChange}
      />
      <NumberInput
        name="age"
        id="profile.age"
        icon={AgeFieldIcon}
        value={user.profile.age}
        error={ageError}
        label={i18n.t('common.form.label.age')}
        handleChange={handleChange}
        min={8}
        max={120}
        required
      />
      {postCodeValidator.isSupportedCountry(country) && (
        <CustomPatternInput
          type="text"
          name="postalcode"
          id="profile.postalcode"
          icon={PostalCodeFieldIcon}
          value={user.profile.postalcode}
          error={postalcodeError}
          label={postalCodeLabel}
          handleChange={handleChange}
          pattern={postCodeValidator.html5regexByCountry(country)}
          required={isPostalCodeRequired}
        />
      )}
      <UntypedInput
        type="text"
        name="profession"
        id="profile.profession"
        icon={JobFieldIcon}
        value={user.profile.profession}
        label={i18n.t('common.form.label.profession', { context: 'optional' })}
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
            <NewWindowIconStyle />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </TermsOfUseLinkStyle>
          {i18n.t('register.gtu_text_second')}
        </span>
      </ConditionParagraphStyle>
      <RegisterCheckBox handleLegalField={handleLegalField} required />
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
