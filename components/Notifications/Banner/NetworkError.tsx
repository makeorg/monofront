import React from 'react';
import i18n from 'i18next';

export const NetworkErrorMessage: React.FC = () => (
  <>{i18n.t('common.notifications.network_error')}</>
);
