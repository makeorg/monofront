import { GlobalState, reducer, ReducerAction } from './reducers';

export const logger = (state: GlobalState, action: ReducerAction) => {
  const newState = reducer({ state, action });
  console.groupCollapsed('Action Type:', action.type);
  console.log('Prev state: ', state);
  console.log('Next state: ', newState);
  console.groupEnd();
  return newState;
};
