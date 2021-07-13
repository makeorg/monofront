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

export type TrackingCommonConfigurationParamsType = {
  location?: string
  source?: string
  language?: string
  country?: string
  questionId?: string
  questionSlug?: string
  referrer?: string
  url?: string
}
export type TrackingConfigurationParamType = TrackingCommonConfigurationParamsType & {
  key?: string
  description?: string
  values?: string[]
  optional?: boolean
  component?: string
};

export type TrackingEventConfigurationType = {
  key: string,
  description: string,
  parameters?: TrackingConfigurationParamType[],
};

export type TrackingEventType = (
  args?: TrackingConfigurationParamType
  ) => {
    eventName: string,
    parameters?: TrackingConfigurationParamType
  }
export type TrackingAllEventsType = {
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
