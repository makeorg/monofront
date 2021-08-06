import { StateRoot } from '@make.org/types';

export const initDevState = (initialState: StateRoot): StateRoot => ({
  ...initialState,
  appConfig: {
    ...initialState.appConfig,
    source: 'widget',
    country: 'FR',
    language: 'fr',
  },
});
