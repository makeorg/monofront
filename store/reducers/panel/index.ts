import { Reducer, ReducerAction, StatePanel } from '@make.org/types';
import {
  PANEL_OPEN,
  PANEL_CLOSE,
  PANEL_SET_CONTENT,
  PANEL_REMOVE_CONTENT,
} from '../../actionTypes';

export const panel_state: StatePanel = {
  isExpanded: false,
  panelContent: undefined,
};

export const panel_reducer: Reducer = (
  state: StatePanel,
  action: ReducerAction
): StatePanel => {
  switch (action.type) {
    case PANEL_OPEN:
      return {
        ...state,
        isExpanded: true,
      };
    case PANEL_CLOSE:
      return {
        ...state,
        isExpanded: false,
      };
    case PANEL_SET_CONTENT:
      return {
        ...state,
        isExpanded: true,
        panelContent: action.payload.panelContent,
      };
    case PANEL_REMOVE_CONTENT:
      return {
        ...state,
        panelContent: undefined,
      };
    default:
      return state;
  }
};
