// enums
export enum Recipient {
  product = 'product',
  business = 'business',
  acquisition = 'acquisition',
}

// Types
export type TrackParameterType = {
  key: string;
  description: string;
  purpose: string;
  example?: string;
  values?: string[];
  optional?: boolean;
  recipients: (keyof typeof Recipient)[];
};

export type TrackEventType = {
  key: string;
  recipients: (keyof typeof Recipient)[];
  description: string;
  parameters: TrackParameterType[];
};

export type TrackConfigurationType = Record<string, TrackEventType>;

export type TrackingEventParamsType = Record<string, string>;

export type TrackingEventType = (args?: TrackingEventParamsType) => {
  eventName: string;
  parameters: TrackingEventParamsType;
};

export type TrackingConsentType = {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  advertising: boolean;
};

export type TrackingAllEventsType = {
  [f: string]: TrackingEventType;
};

// see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters for more information
type FbUserDataType = {
  external_id: string | string[]; // user id as SHA256
  client_user_agent?: string;
};

export type FbConversionEventClientType = {
  event_name: string;
  user_data: FbUserDataType;
  event_source_url?: string;
  event_id?: string; // The event_id and event_name parameters are used to deduplicate events sent by both Meta Pixel and the Conversions API
  custom_data?: Record<string, string>;
};

// see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#event-id for more information
export type FbEventType = FbConversionEventClientType & {
  opt_out?: boolean; // A flag that indicates we should not use this event for ads delivery optimization. If set to true, we only use the event for attribution.
  action_source:
    | 'email'
    | 'website'
    | 'phone_call'
    | 'chat'
    | 'physical_store'
    | 'system_generated'
    | 'other';
  data_processing_options?: ['LDU']; // Limited Data Use - see https://developers.facebook.com/docs/marketing-apis/data-processing-options
  data_processing_options_country: 1 | 0; // 1 => US, 0 => geoloc
  data_processing_options_state: 1000 | 0; // 1000 => California, 0 => geoloc
  event_time: number;
};

type twClId = {
  twclid: string;
};

type hashedEmail = {
  hashed_email: string;
};

type TwConversionType = {
  conversionTime: Date;
  event_id: string;
  identifiers: Array<twClId | hashedEmail>;
  conversion_id?: string;
};

export type TwConversionEventClientType = { conversions: TwConversionType[] };

export type TwConversionSecret = {
  consumerApiKey: string;
  consumerApiSecret: string;
  accessToken: string;
  tokenSecret: string;
};

export type TwOAuthParamsType = {
  oauth_consumer_key: string;
  oauth_token: string;
  oauth_timestamp: number;
  oauth_nonce: string;
  oauth_signature_method: string;
  oauth_version: string;
};

export type TwErrorResponse = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: { errors: []; request: Record<string, string>[] };
};
