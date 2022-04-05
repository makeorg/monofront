import { StateRoot } from '@make.org/types';
import { DESKTOP_DEVICE } from '@make.org/utils/constants/config';

export const initDevState = (
  initialState: StateRoot,
  currentQuestion: string
): StateRoot => ({
  ...initialState,
  appConfig: {
    ...initialState.appConfig,
    source: 'widget',
    device: DESKTOP_DEVICE,
    country: 'FR',
    language: 'fr',
    queryParams: {
      source: 'mag_plus',
    },
  },
  sequence: {
    ...initialState.sequence,
    loadFirstProposal: true,
    sequenceKind: 'standard',
  },
  currentQuestion,
});
