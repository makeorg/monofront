import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { SvgSadEmoji } from 'Client/ui/Svg/elements';
import { SecuredExpirationStyle } from 'Client/ui/Elements/Notifications/Banner/style';

export const SecureExpiredMessage = (): React.FC => (
  <SecuredExpirationStyle>
    {i18n.t('common.notifications.secure_expired.first_sentence')}
    <> </>
    <SvgSadEmoji
      style={{ width: '26px', height: '16px', padding: '0 5px' }}
      aria-label={i18n.t('common.notifications.secure_expired.emoji')}
      focusable="false"
    />
    <> </>
    {i18n.t('common.notifications.secure_expired.second_sentence')}
  </SecuredExpirationStyle>
);
