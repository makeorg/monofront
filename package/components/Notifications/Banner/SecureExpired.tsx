/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import i18n from 'i18next';
import { SvgSadEmoji } from '@make.org/ui/Svg/elements';
import { SecuredExpirationStyle } from './style';

export const SecureExpiredMessage: React.FC = () => (
  <SecuredExpirationStyle>
    {i18n.t('common.notifications.secure_expired.first_sentence')}
    <> </>
    <SvgSadEmoji
      style={{ width: '26px', height: '16px', padding: '0 5px' }}
      aria-label={
        i18n.t('common.notifications.secure_expired.emoji') || undefined
      }
      focusable="false"
    />
    <> </>
    {i18n.t('common.notifications.secure_expired.second_sentence')}
  </SecuredExpirationStyle>
);
