/** Proposal Action */
export const PROPOSAL_INIT_PENDING = 'PROPOSAL_INIT_PENDING';
export const PROPOSAL_CLEAR_PENDING = 'PROPOSAL_CLEAR_PENDING';
export const PROPOSAL_REGISTER_STEP = 'PROPOSAL_REGISTER_STEP';
export const PROPOSAL_PENDING_SOURCE = 'PROPOSAL_PENDING_SOURCE';
export const PROPOSAL_ENABLE_ANONYMOUS = 'PROPOSAL_ENABLE_ANONYMOUS';
export const PROPOSAL_DISABLE_ANONYMOUS = 'PROPOSAL_DISABLE_ANONYMOUS';

/** Panel action */
export const PANEL_OPEN = 'PANEL_OPEN';
export const PANEL_CLOSE = 'PANEL_CLOSE';
export const PANEL_SET_CONTENT = 'PANEL_SET_CONTENT';
export const PANEL_REMOVE_CONTENT = 'PANEL_REMOVE_CONTENT';
/** Login Action */
export const LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const GET_INFO = 'USER_GET_INFO';
export const LOGIN_SOCIAL_REQUEST = 'USER_LOGIN_SOCIAL_REQUEST';
export const LOGIN_SOCIAL_SUCCESS = 'USER_LOGIN_SOCIAL_SUCCESS';
export const LOGIN_SOCIAL_FAILURE = 'USER_LOGIN_SOCIAL_FAILURE';
export const LOGOUT = 'USER_LOGOUT';
/** Modal action */
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const MODAL_CLOSE_COOKIES = 'MODAL_CLOSE_COOKIES';
export const MODAL_SHOW_FORGOT_PASSWORD = 'MODAL_SHOW_FORGOT_PASSWORD';
export const MODAL_SHOW_DEPARTMENT_FORM = 'MODAL_SHOW_DEPARTMENT_FORM';
export const MODAL_SHOW_SESSION_EXPIRATION = 'MODAL_SHOW_SESSION_EXPIRATION';
export const MODAL_CLOSE_SESSION_EXPIRATION = 'MODAL_CLOSE_SESSION_EXPIRATION';
export const MODAL_SHOW_COOKIES = 'MODAL_SHOW_COOKIES';
export const MODAL_SHOW_DATAPOLICY_LOGIN = 'MODAL_SHOW_DATAPOLICY_LOGIN';
export const MODAL_SHOW_DATAPOLICY_SOCIAL = 'MODAL_SHOW_DATAPOLICY_SOCIAL';
export const MODAL_CLOSE_DATAPOLICY = 'MODAL_CLOSE_DATAPOLICY';
export const MODAL_SHOW_SORT = 'MODAL_SHOW_SORT';
export const MODAL_CLOSE_SORT = 'MODAL_CLOSE_SORT';
export const MODAL_SHOW_FILTERS = 'MODAL_SHOW_FILTERS';
export const MODAL_CLOSE_FILTERS = 'MODAL_CLOSE_FILTERS';

/** Sequence action */
export const SEQUENCE_PROPOSAL_VOTE = 'SEQUENCE_PROPOSAL_VOTE';
export const SEQUENCE_PROPOSAL_UNVOTE = 'SEQUENCE_PROPOSAL_UNVOTE';
export const SEQUENCE_LOAD_PROPOSALS = 'SEQUENCE_LOAD_PROPOSALS';
export const SEQUENCE_LOAD_CARDS = 'SEQUENCE_LOAD_CARDS';
export const SEQUENCE_UPDATE_CARD_STATE = 'SEQUENCE_UPDATE_CARD_STATE';
export const SEQUENCE_RESET_VOTED_PROPOSALS = 'SEQUENCE_RESET_VOTED_PROPOSALS';
export const SEQUENCE_SET_INDEX = 'SEQUENCE_SET_INDEX';
export const SEQUENCE_INCREMENT_INDEX = 'SEQUENCE_INCREMENT_INDEX';
export const SEQUENCE_DECREMENT_INDEX = 'SEQUENCE_DECREMENT_INDEX';
export const SEQUENCE_DEMOGRAPHICS_SUBMITTED =
  'SEQUENCE_DEMOGRAPHICS_SUBMITTED';
export const SEQUENCE_RELAUNCH = 'SEQUENCE_RELAUNCH';
export const SEQUENCE_DEMOGRAPHICS_RENDER = 'SEQUENCE_DEMOGRAPHICS_RENDER';
export const SEQUENCE_DISABLE_FIRST_PROPOSAL =
  'SEQUENCE_DISABLE_FIRST_PROPOSAL';
export const SEQUENCE_SET_LOADING = 'SEQUENCE_SET_LOADING';
export const SEQUENCE_SET_LENGTH = 'SEQUENCE_SET_LENGTH';
export const SEQUENCE_SET_LABEL = 'SEQUENCE_SET_LABEL';
export const SEQUENCE_SET_SESSION_BINDING_MODE =
  'SEQUENCE_SET_SESSION_BINDING_MODE';

/** Notification action */
export const DISPLAY_NOTIFICATION_BANNER = 'DISPLAY_NOTIFICATION_BANNER';
export const DISPLAY_NOTIFICATION_TIP = 'DISPLAY_NOTIFICATION_TIP';
export const CLOSE_NOTIFICATION_BANNER = 'CLOSE_NOTIFICATION_BANNER';
export const CLOSE_NOTIFICATION_TIP = 'CLOSE_NOTIFICATION_TIP';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

/** Cookies Preferences */
export const UPDATE_TRACKING_CONSENT = 'UPDATE_TRACKING_CONSENT';
export const REJECT_ALL_TRACKING_CONSENT = 'REJECT_ALL_TRACKING_CONSENT';
export const ACCEPT_ALL_TRACKING_CONSENT = 'ACCEPT_ALL_TRACKING_CONSENT';

/** Password Recovery */
export const PASSWORD_RECOVERY_REQUEST = 'USER_PASSWORD_RECOVERY_REQUEST';
export const PASSWORD_RECOVERY_FAILURE = 'USER_PASSWORD_RECOVERY_FAILURE';
export const PASSWORD_RECOVERY_SUCCESS = 'USER_PASSWORD_RECOVERY_SUCCESS';
/** Session */
export const SET_SESSION_ID = 'SET_SESSION_ID';
/** i18n */
export const SET_COUNTRY_CONFIGURATION = 'SET_COUNTRY_CONFIGURATION';
export const SET_LANGUAGE_CONFIGURATION = 'SET_LANGUAGE_CONFIGURATION';
/** Set device configuration */
export const SET_DESKTOP_DEVICE = 'SET_DESKTOP_DEVICE';
export const SET_MOBILE_DEVICE = 'SET_MOBILE_DEVICE';
/** Get proposals for widget */
export const GET_ALL_PROPOSALS = 'GET_ALL_PROPOSALS';
/* set current question */
export const SET_CURRENT_QUESTION_SLUG = 'SET_CURRENT_QUESTION_SLUG';
export const REMOVE_CURRENT_QUESTION_SLUG = 'REMOVE_CURRENT_QUESTION_SLUG';
/* questions array */
export const LOAD_QUESTION = 'LOAD_QUESTION';
export const QUESTION_POPULAR_TAGS_LOAD = 'QUESTION_POPULAR_TAGS_LOAD';
export const QUESTION_PERSONALITIES_LOAD = 'QUESTION_PERSONALITIES_LOAD';
/* Views actions */
export const LOAD_HOMEPAGE = 'LOAD_HOMEPAGE';
