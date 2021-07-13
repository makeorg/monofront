export type PerformanceTimingType = {
  connectStart: number
  connectEnd: number
  domComplete: number
  domContentLoadedEventEnd: number
  domContentLoadedEventStart: number
  domInteractive: number
  domLoading: number
  domainLookupEnd: number
  domainLookupStart: number
  fetchStart: number
  loadEventEnd: number
  loadEventStart: number
  navigationStart: number
  redirectEnd: number
  redirectStart: number
  requestStart: number
  responseEnd: number
  responseStart: number
  secureConnectionStart: number
  unloadEventEnd: number
  unloadEventStart: number
};

export type TrackingConfigurationParamType = {
  key: string,
  description: string,
  values?: string[],
  optional?: boolean,
};

export type TrackingConfigurationType = {
  key: string,
  description: string,
  parameters: TrackingConfigurationParamType[],
};

export type TrackingEventArgsType = {
  eventName: string
  parameters: TrackingConfigurationParamType[]
}
export type TrackingEventType = (args: TrackingEventArgsType) => { eventName: string, parameters: TrackingConfigurationParamType }
export type TrackingEventsType = {
  [f: string]: TrackingEventType
}

export type TrackingApiServiceParamsType = {
  eventName: string
  eventParameters: TrackingConfigurationParamType
  eventType: string
}

export type TrackingParamsUpdateType = {
  source?: string
  country?: string
  language?: string
  location?: string
  url?: string
  referrer?: string
  questionId?: string
  questionSlug?: string
}

export type TrackingParamsListenerType = {
  onTrackingUpdate: (params: TrackingParamsUpdateType) => void
}
