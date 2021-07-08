import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { modalShowForgotPassword } from '@make.org/store/actions/modal';
import { CustomErrorTriggerStyle } from '@make.org/ui/elements/Form/Styled/Errors';
import { useAppContext } from '../../../../../store';

type Props = {
  inputId?: string;
  labelText?: string;
};

export const ErrorMessageForgotPassword: React.FC<Props> = ({
  inputId = 'password',
  labelText = i18n.t('common.form.label.password'),
}) => {
  const { dispatch } = useAppContext();

  return (
    <>
      <span
        dangerouslySetInnerHTML={{
          __html: i18n.t(
            'profile.password_update.actual_password.invalid_password',
            {
              label: `<label for="${inputId}">${labelText.toLowerCase()}</label>`,
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
