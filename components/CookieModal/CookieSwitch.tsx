import React from 'react';
import { SwitchButton } from '@make.org/ui/components/Switch';
import Cookies from 'universal-cookie';
import { COOKIE } from '@make.org/types/enums';
import {
  trackClickCookieSwitchAccept,
  trackClickCookieSwitchRefuse,
} from '@make.org/utils/services/Tracking';
import { setCookiesPreferencesInApp } from '@make.org/store/actions/user/cookiesPreferences';
import { StateUserCookiesPreferences } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import {
  CookieModalCookieDetailParagraphStyle,
  CookieModalElementSwitchWrapperStyle,
  CookieSwitchWrapperStyle,
} from './style';

type Props = {
  value: keyof StateUserCookiesPreferences;
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

  const cookies = new Cookies();
  const preferencesCookieValueOnLoad = cookies.get(COOKIE.USER_PREFERENCES);

  return (
    <CookieModalElementSwitchWrapperStyle>
      <CookieModalCookieDetailParagraphStyle
        className={onCookiePage ? 'cookie-page' : ''}
      >
        {description}
        <CookieSwitchWrapperStyle>
          <SwitchButton
            value={preferencesCookieValueOnLoad[value]}
            onEnabling={() => {
              dispatch(
                setCookiesPreferencesInApp({
                  ...cookiesPreferences,
                  [value]: true,
                })
              );
              trackClickCookieSwitchAccept(value);
            }}
            onDisabling={() => {
              dispatch(
                setCookiesPreferencesInApp({
                  ...cookiesPreferences,
                  [value]: false,
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
