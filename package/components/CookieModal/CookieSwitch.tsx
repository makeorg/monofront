import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { COOKIE } from '@make.org/types/enums';
import {
  trackClickCookieSwitchAccept,
  trackClickCookieSwitchRefuse,
} from '@make.org/utils/services/Tracking';
import { setCookiesPreferencesInApp } from '@make.org/store/actions/user/cookiesPreferences';
import { StateUserCookiesPreferences } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { env } from '@make.org/assets/env';
import { SwitchButton } from '@make.org/designsystem/components/Buttons/Switch';
import {
  CookieModalCookieDetailParagraphStyle,
  CookieModalElementSwitchWrapperStyle,
  CookieSwitchWrapperStyle,
} from './style';

type Props = {
  value: keyof StateUserCookiesPreferences['tracking_consent'];
  description: string;
  // eslint-disable-next-line react/require-default-props
  onCookiePage?: boolean;
};

export const CookieSwitch: React.FC<Props> = ({
  value,
  description,
  onCookiePage,
}) => {
  const { dispatch, state } = useAppContext();
  const { cookiesPreferences } = state.user;
  const [preferenceValue, setPreferenceValue] = useState(false);
  const cookies = env.isClientSide() && new Cookies();

  useEffect(() => {
    if (cookies) {
      const preferencesFromCookie = cookies.get(
        COOKIE.USER_PREFERENCES
      )?.tracking_consent;

      if (preferencesFromCookie) {
        setPreferenceValue(preferencesFromCookie[value]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  return (
    <CookieModalElementSwitchWrapperStyle>
      <CookieModalCookieDetailParagraphStyle
        className={onCookiePage ? 'cookie-page' : ''}
      >
        {description}
        <CookieSwitchWrapperStyle>
          <SwitchButton
            value={preferenceValue}
            onEnabling={() => {
              dispatch(
                setCookiesPreferencesInApp({
                  tracking_consent: {
                    ...cookiesPreferences.tracking_consent,
                    [value]: true,
                  },
                })
              );
              trackClickCookieSwitchAccept(value);
            }}
            onDisabling={() => {
              dispatch(
                setCookiesPreferencesInApp({
                  tracking_consent: {
                    ...cookiesPreferences.tracking_consent,
                    [value]: false,
                  },
                })
              );
              trackClickCookieSwitchRefuse(value);
            }}
          />
        </CookieSwitchWrapperStyle>
      </CookieModalCookieDetailParagraphStyle>
    </CookieModalElementSwitchWrapperStyle>
  );
};
