/* eslint-disable react/no-danger */
import React from 'react';
import i18n from 'i18next';
import { modalShowForgotPassword } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import { CustomErrorTriggerStyle } from '@make.org/ui/elements/FormElements';

type Props = {
  inputId?: string;
  labelText?: string | null;
};

export const ErrorMessageForgotPassword: React.FC<Props> = ({
  inputId = 'password',
  labelText,
}) => {
  const message = labelText
    ? labelText.toLowerCase()
    : i18n.t('common.form.label.password');
  const { dispatch } = useAppContext();

  return (
    <>
      <span
        dangerouslySetInnerHTML={{
          __html: i18n.t(
            'profile.password_update.actual_password.invalid_password',
            {
              label: `<label for="${inputId}">${message}</label>`,
            }
          ),
        }}
      />
      <CustomErrorTriggerStyle
        onClick={() => dispatch(modalShowForgotPassword())}
      >
        {i18n.t('profile.password_update.actual_password.trigger')}
      </CustomErrorTriggerStyle>
    </>
  );
};
