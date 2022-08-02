/* eslint-disable  no-underscore-dangle */
import {
  TrackingCommonConfigurationParamsType,
  TrackingParamsOnUpdateListenerType,
  TrackingParamsBeforeGetListenerType,
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

  _onUpdateListeners: TrackingParamsOnUpdateListenerType[] = [];

  _beforeGetListeners: TrackingParamsBeforeGetListenerType[] = [];

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
  }

  set url(url: string | undefined) {
    if (this._url !== url) {
      this._url = url;
      this._dispatchUpdate();
    }
  }

  get url() {
    return this._url;
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

  get questionId() {
    return this._questionId;
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
    this._onUpdateListeners.forEach(listener =>
      listener.onTrackingUpdate(this._all)
    );
  }

  addOnUpdateListener(object: TrackingParamsOnUpdateListenerType) {
    const requiredMethod = object.onTrackingUpdate;
    if (requiredMethod === undefined) {
      throw new Error('Object does not support the interface.');
    }
    this._onUpdateListeners.push(object);
  }

  addBeforeGetListener(object: TrackingParamsBeforeGetListenerType) {
    const requiredMethod = object.execute;
    if (requiredMethod === undefined) {
      throw new Error('Object does not support the interface.');
    }
    this._beforeGetListeners.push(object);
  }

  all(): TrackingCommonConfigurationParamsType {
    this._beforeGetListeners.forEach(listener => listener.execute());

    return this._all;
  }
}

export const trackingParamsService = new TrackingParamsServiceClass();
