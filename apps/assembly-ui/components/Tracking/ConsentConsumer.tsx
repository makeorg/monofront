import { FC, useCallback, useEffect } from 'react';
import { useTracking } from './useTracking';
import { useAssemblyContext } from '../../store/context';
import { updateSessionVisitor } from '../../store/sessionVisitor/actions';

export const ConsentConsumer: FC = (): null => {
  const { updateFromConsent } = useTracking();
  const { dispatch } = useAssemblyContext();

  const handleConsent = useCallback(
    async (e: unknown) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await updateFromConsent(e.detail ?? {});
      dispatch(updateSessionVisitor(data || { sessionId: '', visitorId: '' }));
    },
    [updateFromConsent, dispatch]
  );

  useEffect(() => {
    window?.addEventListener('cf_consent_loaded', handleConsent);
    window?.addEventListener('cf_consent', handleConsent);

    return () => {
      window?.removeEventListener('cf_consent', handleConsent);
      window?.removeEventListener('cf_consent_loaded', handleConsent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
