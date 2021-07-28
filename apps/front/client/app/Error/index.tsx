import * as React from 'react';
import { Logger } from '@make.org/utils/services/Logger';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { setUnexpectedError } from '@make.org/utils/services/DefaultErrorHandler';
import {
  NETWORK_ERROR_MESSAGE,
  NOTIFICATION_LEVEL_ALERT,
  UNEXPECTED_ERROR_MESSAGE,
} from '@make.org/utils/constants/notifications';
import { useAppContext } from '@make.org/store';

type Props = {
  children: any;
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
    Logger.logError(JSON.stringify(error));
  }

  render(): any {
    // init service error notification

    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Un problème est survenu.</h1>;
    }
    return <>{children}</>;
  }
}

/**
 * Handles Services Error
 */
export const ServiceErrorHandler: React.FC = ({ children }) => {
  const { dispatch } = useAppContext();
  setUnexpectedError(error => {
    Logger.logError(JSON.stringify(error));
    if (
      typeof window !== 'undefined' &&
      window &&
      window.navigator &&
      window.navigator.onLine === false
    ) {
      dispatch(
        displayNotificationBanner(
          NETWORK_ERROR_MESSAGE,
          NOTIFICATION_LEVEL_ALERT
        )
      );
    } else {
      dispatch(
        displayNotificationBanner(
          UNEXPECTED_ERROR_MESSAGE,
          NOTIFICATION_LEVEL_ALERT
        )
      );
    }
  });

  return <>{children}</>;
};
