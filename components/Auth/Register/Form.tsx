import React, { ChangeEvent, FormEvent } from 'react';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FORM } from '@make.org/types/enums';
import { throttle } from '@make.org/utils/helpers/throttle';
import {
  SeparatorStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { SocialRegisterButtonsWrapperStyle } from '../style';
import { TitleForm } from './Title';
import { FirstStepRegister } from './FirstStep';
import { FacebookAuthentication } from '../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../Social/GoogleAuthentication';

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
  const emailError = getFieldError('email', errors);
  const passwordError = getFieldError('password', errors);
  const firstnameError = getFieldError('firstname', errors);
  const ageError = getFieldError('dateofbirth', errors);
  const postalcodeError = getFieldError('postalcode', errors);

  return (
    <FormCenterAlignStyle
      id={FORM.REGISTER_FORMNAME}
      onSubmit={throttle(handleSubmit)}
    >
      <TitleForm errors={errors} registerPanelStep={registerPanelStep} />
      {registerPanelStep === 1 && (
        <FirstStepRegister
          user={user}
          emailError={emailError}
          passwordError={passwordError}
          handleChange={handleChange}
          checkRegistration={checkRegistration}
        />
      )}
      <SeparatorWrapperStyle className="margin-top margin-bottom">
        <SeparatorStyle />
        <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
        <SeparatorStyle />
      </SeparatorWrapperStyle>
      <SocialRegisterButtonsWrapperStyle>
        <FacebookAuthentication />
        <GoogleAuthentication />
      </SocialRegisterButtonsWrapperStyle>
      {registerPanelStep === 2 && (
        <SecondStepRegister
          user={user}
          firstnameError={firstnameError}
          ageError={ageError}
          postalcodeError={postalcodeError}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          disableSubmit={disableSubmit}
        />
      )}
    </FormCenterAlignStyle>
  );
};
