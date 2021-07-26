import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { StateConfig, ReducerAction, Dispatch } from '@make.org/types';
import {
  formatdDataForHeader,
  saveAll,
} from '@make.org/utils/helpers/customData';
import {
  addValueAndGetCustomData,
  removeKeyAndGetCustomData,
} from '../reducers/customData';
import { CUSTOM_DATA_REMOVE_KEY, CUSTOM_DATA_SET_KEY } from '../actionTypes';

export const updateRequestContextCustomData = (
  customData: Record<string, string>
): void => {
  apiClient.customData = formatdDataForHeader(customData);
};

export const requestContext =
  (state: StateConfig) =>
  (next: Dispatch) =>
  (action: ReducerAction): void => {
    switch (action.type) {
      case CUSTOM_DATA_SET_KEY: {
        const customDataUpdated = addValueAndGetCustomData(
          state.customData,
          action.payload.key,
          action.payload.value
        );
        updateRequestContextCustomData(customDataUpdated);
        saveAll(customDataUpdated);
        return next(action);
      }

      case CUSTOM_DATA_REMOVE_KEY: {
        const customDataUpdated = removeKeyAndGetCustomData(
          state.customData,
          action.payload.key
        );
        updateRequestContextCustomData(customDataUpdated);
        saveAll(customDataUpdated, false);
        return next(action);
      }

      default:
        return next(action);
    }
  };
