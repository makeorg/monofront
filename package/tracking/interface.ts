import { Recipient } from "./types";


export class TrackingValidationError extends Error {}

export type TrackerProviderType = {
  recipients: (keyof typeof Recipient)[];
  name: string;
  send(
    uniqueId: string,
    eventName: string,
    params: Record<string, string>
  ): void;
};
