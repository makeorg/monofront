import React from 'react';
import i18n from 'i18next';

export const UnexpectedErrorMessage: React.FC = () => (
  <>{i18n.t('common.notifications.unexpected_error')}</>
);
