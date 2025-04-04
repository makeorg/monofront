import { FC } from 'react';
import { useAppContext } from '@make.org/store';

export const OidcPage: FC = () => {
  const { state } = useAppContext();

  if (typeof window !== 'undefined')
    window.opener.postMessage(
      {
        openIdCode: state.openIdResponse?.code,
        openIdError: state.openIdResponse?.error,
        openIdErrorDescription: state.openIdResponse?.errorDescription,
      },
      window.location.origin
    );
  return null;
};
