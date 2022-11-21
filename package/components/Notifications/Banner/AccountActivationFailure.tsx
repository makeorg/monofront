import React from 'react';
import i18n from 'i18next';

export const AccountActivationFailureMessage: React.FC = () => (
  <>{i18n.t('common.notifications.bad_link')}</>
);
