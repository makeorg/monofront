import React, { ErrorInfo, ReactNode } from 'react';

export interface IErrorLogger {
  logError: (error: unknown) => void;
  logInfo: (error: unknown) => void;
  logWarning: (error: unknown) => void;
}

interface Props {
  children?: ReactNode;
  logger?: IErrorLogger;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  #logger?: IErrorLogger;

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
    this.#logger = props.logger;
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.#logger?.logError({
      message: 'Uncaught error:',
      app_error: error,
      app_error_info: errorInfo,
      stack: errorInfo.componentStack,
    });
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Oops, something went wrong</h1>;
    }

    return children;
  }
}
