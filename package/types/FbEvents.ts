import { TrackingConfigurationParamType } from './Tracking';

// see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters for more information
export type FbUserDataType = {
  external_id: string | string[]; // user id as SHA256
  client_user_agent?: string;
};

export type FbEventClientType = {
  event_name: string;
  user_data: FbUserDataType;
  event_source_url?: string;
  event_id?: string; // The event_id and event_name parameters are used to deduplicate events sent by both Meta Pixel and the Conversions API
  custom_data?: TrackingConfigurationParamType;
};

// see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#event-id for more information
export type FbEventType = FbEventClientType & {
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
