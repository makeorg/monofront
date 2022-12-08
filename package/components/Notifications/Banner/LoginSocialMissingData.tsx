import React, { FC } from 'react';
import i18n from 'i18next';

export const LoginSocialMissingDataMessage: FC = () => (
  <>{i18n.t('common.notifications.login_social_missing_email_data')}</>
);
