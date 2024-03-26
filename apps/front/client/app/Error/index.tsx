import * as React from 'react';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { setUnexpectedError } from '@make.org/utils/services/DefaultErrorHandler';
import { NOTIF } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { FC, ReactNode } from 'react';
import { ClientLogger } from '@make.org/logger/clientLogger';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Handles Error Logger Business Logic
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error): void {
    this.setState({ hasError: true });
    ClientLogger.getInstance().logError(error);
  }

  render(): ReactNode {
    // init service error notification

    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Un problème est survenu.</h1>;
    }

    return children;
  }
}

/**
 * Handles Services Error
 */
export const ServiceErrorHandler: FC<Props> = ({ children }) => {
  const { dispatch } = useAppContext();
  setUnexpectedError(error => {
    ClientLogger.getInstance().logError(error);
    if (
      typeof window !== 'undefined' &&
      window &&
      window.navigator &&
      window.navigator.onLine === false
    ) {
      dispatch(
        displayNotificationBanner(
          NOTIF.NETWORK_ERROR_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_ALERT
        )
      );
    } else {
      dispatch(
        displayNotificationBanner(
          NOTIF.UNEXPECTED_ERROR_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_ALERT
        )
      );
    }
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
