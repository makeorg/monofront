import { FC, useCallback, useEffect } from 'react';
import { useTracking } from './useTracking';

export const ConsentConsumer: FC = (): null => {
  const { updateFromConsent } = useTracking();

  const delay = (ms: number) =>
    new Promise(resolve => {
      setTimeout(resolve, ms);
    });

  const handleConsent = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!window?.CookieFirst) {
      return;
    }
    await delay(100);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateFromConsent(window?.CookieFirst?.consent);
  }, [updateFromConsent]);

  useEffect(() => {
    window?.addEventListener('cf_init', handleConsent);
    window?.addEventListener('cf_consent', handleConsent);

    return () => {
      window?.removeEventListener('cf_init', handleConsent);
      window?.removeEventListener('cf_consent', handleConsent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
