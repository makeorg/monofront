import { Recipient, TrackingConsentType } from './types';

export class TrackingValidationError extends Error {}

export interface ITrackerProvider {
  recipients: (keyof typeof Recipient)[];
  name: string;
  consent: keyof TrackingConsentType;
  send(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): void;
  setEnabled(enabled: boolean): void;
}

export interface ILogger {
  logError: (error: unknown) => void;
  logInfo: (error: unknown) => void;
  logWarning: (error: unknown) => void;
}

export interface IClientService {
  callApi(
    url: string,
    options: { method: string; headers?: HeadersInit; body?: unknown }
  ): Promise<Response>;
}

export interface IConversionService<T, M> {
  getClientConversion: (
    clientService: IClientService,
    apiPath: string
  ) => IConversionClientService;
  getServerConversion: (
    clientService: IClientService,
    secret: T
  ) => IConversionServerService<M>;
}

export interface IConversionClientService {
  sendEventFromClient: (
    eventName: string,
    eventId: string,
    params: Record<string, string>,
    identificationId?: string,
    url?: string
  ) => Promise<void>;
}

export interface IConversionServerService<M> {
  callApiConversion: (data: M) => void;
}
