import { ReducerAction, StateRoot } from '@make.org/types';

type SliceType = {
  [key: string]: any; // TO DO
};

export const combineReducers =
  (slices: SliceType) =>
  (state: StateRoot, action: ReducerAction): any =>
    Object.keys(slices)
      .filter(s => s !== undefined)
      .reduce((flatReducer: SliceType, prop) => {
        if (prop in slices && slices[prop] !== undefined) {
          return {
            ...flatReducer,
            [prop]: slices[prop](flatReducer[prop], action || {}),
          };
        }
        return flatReducer;
      }, state);

export const getCurrentTimeFormatted = (): string => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const deepEqual = (x: StateRoot, y: StateRoot): boolean =>
  JSON.stringify(x) === JSON.stringify(y);
