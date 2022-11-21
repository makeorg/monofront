import { ReducerAction } from '@make.org/types';
import {
  saveAll,
  updateRequestContextCustomData,
} from '@make.org/utils/helpers/customData';
import { CUSTOM_DATA_REMOVE_KEY, CUSTOM_DATA_SET_KEY } from '../../actionTypes';

export const addValueAndGetCustomData = (
  customDataObject: Record<string, string>,
  key: string,
  value: string
): Record<string, string> => ({
  ...customDataObject,
  [key]: value,
});

export const removeKeyAndGetCustomData = (
  customDataObject: Record<string, string>,
  key: string
): {
  [x: string]: string;
} => {
  const stateCopy = { ...customDataObject };
  delete stateCopy[key];
  return stateCopy;
};

export const customData = (
  state: Record<string, string>,
  action: ReducerAction
): Record<string, string> => {
  switch (action.type) {
    case CUSTOM_DATA_SET_KEY: {
      const customDataUpdated = addValueAndGetCustomData(
        state,
        action.payload.key,
        action.payload.value
      );
      updateRequestContextCustomData(customDataUpdated);
      saveAll(customDataUpdated);
      return customDataUpdated;
    }
    case CUSTOM_DATA_REMOVE_KEY: {
      const customDataUpdated = removeKeyAndGetCustomData(
        state,
        action.payload.key
      );
      updateRequestContextCustomData(customDataUpdated);
      saveAll(customDataUpdated, false);
      return customDataUpdated;
    }
    default:
      return state;
  }
};
