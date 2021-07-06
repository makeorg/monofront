import { ReducerAction } from '@make.org/types';
import {
  CLOSE_NOTIFICATION_BANNER,
  DISMISS_NOTIFICATION,
  DISPLAY_NOTIFICATION_BANNER,
  CLOSE_NOTIFICATION_TIP,
  DISPLAY_NOTIFICATION_TIP,
} from '../../actionTypes';

export const clearNotificationBanner = (): ReducerAction => ({
  type: CLOSE_NOTIFICATION_BANNER,
});

export const dismissNotification = (contentId: string): ReducerAction => ({
  type: DISMISS_NOTIFICATION,
  payload: { contentId },
});

export const displayNotificationBanner = (
  contentId: string,
  level?: string,
  params?: any,
  toDismiss?: boolean
): ReducerAction => ({
  type: DISPLAY_NOTIFICATION_BANNER,
  payload: { contentId, level, toDismiss, params },
});

export const clearNotificationTip = (): ReducerAction => ({
  type: CLOSE_NOTIFICATION_TIP,
});

export const displayNotificationTip = (
  contentId: string,
  level?: string,
  toDismiss?: boolean
): ReducerAction => ({
  type: DISPLAY_NOTIFICATION_TIP,
  payload: { contentId, level, toDismiss },
});
