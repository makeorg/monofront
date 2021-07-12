/* eslint-disable react/no-danger */
import React from 'react';
import { i18n } from '@make.org/utils/i18n';

type WithLabelProps = {
  messageKey: string;
  field: string;
  labelKey: string;
};

export const MessageWithDynamicLabel: React.FC<WithLabelProps> = ({
  messageKey,
  field,
  labelKey,
}) => (
  <span
    dangerouslySetInnerHTML={{
      __html: i18n.t(messageKey, {
        context: 'dynamic',
        label: `<label for="${field}">${i18n
          .t(labelKey)
          .toLowerCase()}</label>`,
      }),
    }}
  />
);

export const LoginErrorMessage: React.FC = () => (
  <span
    dangerouslySetInnerHTML={{
      __html: i18n.t('login.email_doesnot_exist', {
        emailLabel: `<label for="email">${i18n
          .t('common.form.label.email')
          .toLowerCase()}</label>`,
        passwordLabel: `<label for="password">${i18n
          .t('common.form.label.password')
          .toLowerCase()}</label>`,
      }),
    }}
  />
);

export const DefaultApiErrorMessage: React.FC = () => (
  <>{i18n.t('common.form.messages.api_error')}</>
);
