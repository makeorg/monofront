import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const AccountActivationFailureMessage: React.FC = () => (
  <>{i18n.t('common.notifications.bad_link')}</>
);
