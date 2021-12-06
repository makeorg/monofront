/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { JSDOM } from 'jsdom';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceMock } from '@make.org/api/ApiService/ApiService.mock';

Enzyme.configure({ adapter: new Adapter() });

require.extensions['.svg'] = () => {
  console.log('svg file');
};

const localStorageMock = (() => {
  let store: Record<string,string> = {};

  return {
    length: 0,
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    key(index: number) {
      return store[index];
    }
  };
})();

// @ts-ignore
global.document = new JSDOM('');
// @ts-ignore
global.window = {
  ...document.defaultView,
  // @ts-ignore
  FRONT_URL: jest.fn(),
  document: {
    ...document,
    referrer: ''
  },
  sessionStorage: localStorageMock
}

// @ts-ignore
global.navigator = { userAgent: 'browser' };
global.React = React;

ApiService.strategy = new ApiServiceMock();

jest.mock('@make.org/utils/services/Trackers/FacebookTracking');
jest.mock('@make.org/utils/services/Trackers/TwitterTracking');
jest.mock('@make.org/utils/constants/config');

if (global.window && global.window.matchMedia) {
  global.window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
}

function storageMock(): Storage {
  const storage: Record<string, string> = {};

  return {
    setItem(key: string, value: string) {
      storage[key] = value || '';
    },
    getItem(key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear() {
      return {};
    },
  };
}

global.localStorage = storageMock();
