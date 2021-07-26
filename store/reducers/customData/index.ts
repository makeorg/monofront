import { ReducerAction } from '@make.org/types';
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
    case CUSTOM_DATA_SET_KEY:
      return addValueAndGetCustomData(
        state,
        action.payload.key,
        action.payload.value
      );
    case CUSTOM_DATA_REMOVE_KEY: {
      return removeKeyAndGetCustomData(state, action.payload.key);
    }
    default:
      return state;
  }
};
