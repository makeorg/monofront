import React, { useEffect, useRef, useState } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { showSessionExpirationModal } from '@make.org/store/actions/modal';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { updateSessionId } from '@make.org/store/actions/session';
import { useAppContext } from '@make.org/store';
import { ExpirationSessionModal } from './Modal';

type Props = {
  /** Children content */
  children: React.ReactNode;
  /** Cookies object */
  cookies: Cookies;
};

const sessionExpirationDateCookieName = 'make-session-id-expiration';
const apiHeaderListenerName = 'sessionIdListener';

const SessionExpirationHandler: React.FC<Props> = ({ children, cookies }) => {
  const { dispatch, state } = useAppContext();
  const { sessionId } = state.session || {};
  const [cookieData, setCookieData] = useState(
    cookies.get(sessionExpirationDateCookieName)
  );
  const sessionExpirationDate = new Date(cookieData);
  const cookieDataRef = useRef(cookieData);
  const { showExpirationSession } = state.modal;
  const [apiSessionId, setApiSessionId] = useState('');

  cookieDataRef.current = cookieData;

  const showModal = () => {
    if (!showExpirationSession) {
      dispatch(showSessionExpirationModal());
    }
  };

  // update apiSessionId from api response header
  useEffect(() => {
    apiClient.addHeadersListener(
      apiHeaderListenerName,
      (headers: { [key: string]: string }): string => {
        setApiSessionId(headers['x-session-id']);
        return headers['x-session-id'];
      }
    );

    return () => {
      apiClient.removeHeadersListener(apiHeaderListenerName);
    };
  }, []);

  // clear apiSessionId when sessionId is cleared after a logout
  useEffect(() => {
    if (!sessionId) {
      setApiSessionId('');
    }
  }, [sessionId]);

  // show modal if sessionId in state not match session id from API response
  useEffect(() => {
    const sessionIdHasChanged = !!apiSessionId && apiSessionId !== sessionId;
    const isInitalSetup = !sessionId;

    if (!isInitalSetup && sessionIdHasChanged) {
      showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiSessionId]);

  // update sessionId from apiSessionId
  useEffect(() => {
    if (apiSessionId && apiSessionId !== sessionId) {
      dispatch(updateSessionId(apiSessionId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiSessionId]);

  // show modal when session expires
  useEffect(() => {
    const currentDate = new Date();
    const timeBeforeExpire =
      sessionExpirationDate.getTime() - currentDate.getTime();
    if (Number.isNaN(timeBeforeExpire) || timeBeforeExpire < 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      if (cookieData !== cookies.get(sessionExpirationDateCookieName)) {
        setCookieData(cookies.get(sessionExpirationDateCookieName));
      } else {
        showModal();
      }
    }, timeBeforeExpire);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieDataRef.current]);

  return (
    <>
      {children}
      <ExpirationSessionModal />
    </>
  );
};

export const SessionExpiration = withCookies(SessionExpirationHandler);
