/* eslint-disable  no-underscore-dangle */
import { getTrackingLocation } from '@make.org/api/ApiService/getLocationContext';
import {
  TrackingCommonConfigurationParamsType,
  TrackingParamsListenerType,
} from '@make.org/types';

class TrackingParamsServiceClass {
  _source = '';

  _language = '';

  _country = '';

  _questionId = '';

  _questionSlug = '';

  _referrer = '';

  _location = '';

  _visitorId = '';

  _url?: string = undefined;

  _listeners: TrackingParamsListenerType[] = [];

  _all: TrackingCommonConfigurationParamsType = {
    location: this._location,
    source: this._source,
    language: this._language,
    country: this._country,
    questionId: this._questionId,
    questionSlug: this._questionSlug,
    referrer: this._referrer,
    url: this._url,
  };

  _instance: TrackingParamsServiceClass | null = null;

  constructor() {
    if (!this._instance) {
      this._instance = this;
    }

    this._referrer =
      typeof window !== 'undefined' && !!window.document.referrer
        ? window.document.referrer
        : '';

    return this._instance;
  }

  set source(source: string) {
    if (this._source !== source) {
      this._source = source;
      this._dispatchUpdate();
    }
  }

  set country(country: string) {
    if (this._country !== country) {
      this._country = country;
      this._dispatchUpdate();
    }
  }

  set language(language: string) {
    if (this._language !== language) {
      this._language = language;
      this._dispatchUpdate();
    }
  }

  set questionId(questionId: string) {
    if (this._questionId !== questionId) {
      this._questionId = questionId;
      this._dispatchUpdate();
    }
  }

  set questionSlug(questionSlug: string) {
    if (this.questionSlug !== questionSlug) {
      this._questionSlug = questionSlug;
      this._dispatchUpdate();
    }
  }

  set referrer(referrer: string) {
    if (this._referrer !== referrer) {
      this._referrer = referrer;
      this._dispatchUpdate();
    }
  }

  set location(location: string) {
    if (this._location !== location) {
      this._location = location;
      this._dispatchUpdate();
    }
  }

  // specific param needed for mixpanel as distuniqueinctId
  // not present in common params : "this._all"
  set visitorId(visitorId: string) {
    if (this._visitorId !== visitorId) {
      this._visitorId = visitorId;
    }
  }

  get visitorId() {
    return this._visitorId;
  }

  _updateDynamicParams() {
    this._url =
      typeof window !== 'undefined' && window && window.location
        ? window.location.href
        : undefined;

    this._location = getTrackingLocation(window.location.pathname);
    this._dispatchUpdate();
  }

  _dispatchUpdate() {
    this._all = {
      location: this._location,
      source: this._source,
      language: this._language,
      country: this._country,
      questionId: this._questionId,
      questionSlug: this._questionSlug,
      referrer: this._referrer,
      url: this._url,
    };
    this._listeners.forEach(listener => listener.onTrackingUpdate(this._all));
  }

  addListener(object: TrackingParamsListenerType) {
    const requiredMethod = object.onTrackingUpdate;
    if (requiredMethod === undefined) {
      throw new Error('Object does not support the interface.');
    }
    this._listeners.push(object);
  }

  all(): TrackingCommonConfigurationParamsType {
    this._updateDynamicParams();
    return this._all;
  }
}

const instance = new TrackingParamsServiceClass();

export const trackingParamsService = instance;
