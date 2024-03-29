import React, { ChangeEvent, FC } from 'react';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import i18n from 'i18next';
import {
  EmailFieldIcon,
  PasswordFieldIcon,
} from '@make.org/utils/constants/icons';
import { ErrorObjectType } from '@make.org/types';
import { PasswordInput } from '@make.org/components/Form/PasswordInput';

type Props = {
  emailValue: string;
  passwordValue: string;
  emailError: ErrorObjectType;
  passwordError: ErrorObjectType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  requirements?: boolean;
  validatePattern?: boolean;
};

export const EmailPasswordFields: FC<Props> = ({
  emailValue,
  passwordValue,
  emailError,
  passwordError,
  handleChange,
  requirements,
  validatePattern = true,
}) => (
  <>
    <UntypedInput
      type="email"
      name="email"
      id="email"
      icon={EmailFieldIcon}
      value={emailValue}
      label={i18n.t('common.form.label.email')}
      required
      error={emailError}
      handleChange={handleChange}
    />
    <PasswordInput
      name="password"
      icon={PasswordFieldIcon}
      value={passwordValue}
      autocomplete="new-password"
      error={passwordError}
      label={i18n.t('common.form.label.password')}
      handleChange={handleChange}
      requirements={requirements}
      validatePattern={validatePattern}
    />
  </>
);
