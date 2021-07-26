import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { UserService } from '@make.org/utils/services/User';
import { clearSessionId } from '@make.org/store/actions/session';
import { useAppContext } from '@make.org/store';

type Props = {
  /** Children content */
  children: React.ReactNode;
};

const SecureExpirationDateCookieName = 'make-secure-expiration';

export const SecureExpiration = ({ children }: Props): React.ReactNode => {
  const { dispatch } = useAppContext();
  const [cookies] = useCookies([SecureExpirationDateCookieName]);
  const [cookieData, setCookieData] = useState(
    cookies[SecureExpirationDateCookieName]
  );
  const secureExpirationDate = new Date(cookieData);
  const cookieDataRef = useRef(cookieData);
  const location = useLocation();

  cookieDataRef.current = cookieData;

  useEffect(() => {
    const currentDate = new Date();
    const FiveMinutesInMilliseconds = 5 * 60 * 1000;
    const timeBeforeExpire =
      secureExpirationDate.getTime() -
      currentDate.getTime() -
      FiveMinutesInMilliseconds;

    if (Number.isNaN(timeBeforeExpire) || timeBeforeExpire < 0) {
      return undefined;
    }

    const timer = setTimeout(async () => {
      if (cookieData !== cookies[SecureExpirationDateCookieName]) {
        setCookieData(cookies[SecureExpirationDateCookieName]);
      } else {
        UserService.logout(() => {
          dispatch(clearSessionId());
          window.location.pathname = `${location.pathname}?secureExpired=true`;
        });
      }
    }, timeBeforeExpire);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieDataRef.current]);

  return children;
};
