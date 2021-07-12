import React from 'react';
import { i18n } from '@make.org/utils/i18n';

export const UnexpectedErrorMessage: React.FC = () => (
  <>{i18n.t('common.notifications.unexpected_error')}</>
);
