export enum Recipient {
    product = 'product',
    business = 'business',
    acquisition = 'acquisition'
}

export type TrackParameterType = {
  key: string;
  description: string;
  purpose: string;
  example?: string;
  values?: string[];
  optional?: boolean;
  recipients: (keyof typeof Recipient)[]
};

export type TrackEventType = {
  key: string;
  description: string;
  parameters: TrackParameterType[];
};

export type TrackConfigurationType = Record<string, TrackEventType>;

export type TrackingEventParamsType = Record<string, string>;

export type TrackingEventType = (args?: TrackingEventParamsType) => {
  eventName: string;
  parameters: TrackingEventParamsType;
};

export type TrackingAllEventsType = {
  [f: string]: TrackingEventType;
};
