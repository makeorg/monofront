import React, { FC } from 'react';
import {
  trackClickCookieSwitchAccept,
  trackClickCookieSwitchRefuse,
} from '@make.org/utils/services/Tracking';
import { updateTrackingConsent } from '@make.org/store/actions/user/trackingConsent';
import { useAppContext } from '@make.org/store';
import { SwitchButton } from '@make.org/designsystem/components/Buttons/Switch';
import { StateTrackingConsent } from '@make.org/types';
import {
  CookieModalCookieDetailParagraphStyle,
  CookieModalElementSwitchWrapperStyle,
  CookieSwitchWrapperStyle,
} from './style';

type Props = {
  tracker: keyof StateTrackingConsent;
  value: boolean;
  description: string;
  onCookiePage?: boolean;
};

export const CookieSwitch: FC<Props> = ({
  tracker,
  value,
  description,
  onCookiePage,
}) => {
  const { dispatch } = useAppContext();

  return (
    <CookieModalElementSwitchWrapperStyle>
      <CookieModalCookieDetailParagraphStyle
        className={onCookiePage ? 'cookie-page' : ''}
      >
        {description}
        <CookieSwitchWrapperStyle>
          <SwitchButton
            value={value}
            onEnabling={() => {
              dispatch(updateTrackingConsent(tracker, true));
              trackClickCookieSwitchAccept(tracker);
            }}
            onDisabling={() => {
              dispatch(updateTrackingConsent(tracker, false));
              trackClickCookieSwitchRefuse(tracker);
            }}
          />
        </CookieSwitchWrapperStyle>
      </CookieModalCookieDetailParagraphStyle>
    </CookieModalElementSwitchWrapperStyle>
  );
};
