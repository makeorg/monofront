import { TrackingService } from 'Shared/services/TrackingService';

const { trackingEvent } = TrackingService;

const getPosition = (cardPosition?: number): string => {
  if (cardPosition !== undefined) {
    return cardPosition.toString();
  }

  return 'single-proposal';
};

/* On Load Consultation Tracking */
export const trackDisplayOperationPage = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PAGE_OPERATION());
};

export const trackClickActionsTab = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_ACTIONS_TAB());
};

export const trackClickParticipateTab = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PARTICIPATE_TAB());
};

export const trackClickExploreTab = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_EXPLORE_TAB());
};

export const trackClickLearnMore = (component?: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_BUTTON_LEARN_MORE({ component })
  );
};

/* Open Sequence Tracking */

export const trackOpenSequence = (component: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SEQUENCE_OPEN({ component })
  );
};

export const trackLoadMoreProposals = (
  componentName: string,
  pageCount?: number
) => {
  const pageNumber = pageCount !== undefined ? pageCount.toString() : undefined;

  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PROPOSAL_VIEW_MORE({
      page: pageNumber,
      component: componentName,
    })
  );
};

/* Sequence Tracking */
export const trackDisplaySequence = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEQUENCE());
};

export const trackDisplayNoProposalSequence = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_NO_PROPOSAL_SEQUENCE());
};

export const trackClickOperationPage = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_OPERATION_PAGE());
};

/* Header Tracking */
export const trackClickMakeLogo = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_MAKEORG_LOGO());
};

/* Moderation Text Tracking */
export const trackDisplayModerationText = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_MODERATION_TEXT());
};

export const trackClickModerationLink = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_MODERATION_LINK());
};

export const trackDisplayAuthenticationForm = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_AUTHENTICATION_FORM());
};

export const trackClickPersonnalDataLink = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PERSONNAL_DATA_LINK());
};

/* Proposal Submit */
export const trackDisplayProposalField = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PROPOSAL_FIELD());
};

export const trackClickProposalSubmit = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROPOSAL_SUBMIT());
};

export const trackClickBackProposals = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_BACK_PROPOSALS());
};

export const trackDisplayProposalSubmitValidation = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PROPOSAL_SUBMIT_VALIDATION()
  );
};

export const trackClickKeepVoting = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_KEEP_VOTING());
};

export const trackDisplayForgotPasswordForm = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_FORGOTPASSWORD_FORM());
};

export const trackClickCloseModal = (modalContext: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_CLOSE_MODAL({
      context: modalContext,
    })
  );
};

/* Sign Up */
export const trackDisplaySignupForm = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SIGN_UP_FORM());
};

export const trackSignupEmailSuccess = () => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_UP_EMAIL_SUCCESS());
};

export const trackSignupEmailFailure = () => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_UP_EMAIL_FAILURE());
};

/* Signin */
export const trackDisplaySigninForm = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SIGN_IN_FORM());
};

export const trackAuthenticationSocialSuccess = (
  socialNetwork: string,
  accountCreation: string
) => {
  TrackingService.sendAllTrackers(
    trackingEvent.AUTHEN_SOCIAL_SUCCESS({
      'social-network': socialNetwork,
      'account-creation': accountCreation,
    })
  );
};

export const trackAuthenticationSocialFailure = (socialNetwork: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.AUTHEN_SOCIAL_FAILURE({
      'social-network': socialNetwork,
    })
  );
};

export const trackLoginEmailSuccess = () => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_IN_EMAIL_SUCCESS());
};

export const trackLoginEmailFailure = () => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_IN_EMAIL_FAILURE());
};

/* Sequence */
export const trackClickStartSequence = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_START_SEQUENCE());
};

export const trackClickNextCard = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEQUENCE_NEXT_CARD());
};

export const trackClickNextOnLastProposal = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEQUENCE_LAST_PROPOSAL());
};

export const trackClickProposalPushCardIgnore = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PROPOSAL_PUSH_CARD_IGNORE()
  );
};

export const trackClickPreviousCard = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEQUENCE_PREVIOUS_CARD());
};

export const trackDisplayIntroCard = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_INTRO_CARD());
};

export const trackDisplayProposalPushCard = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PROPOSAL_PUSH_CARD());
};

export const trackDisplaySignUpCard = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SIGN_UP_CARD());
};

export const trackDisplayFinalCard = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_FINAL_CARD());
};

/* Tags Tracking */
export const trackTag = (label: string, action: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_TAG_ACTION({
      'tag-name': label,
      nature: action,
    })
  );
};

export const trackFilter = (label: string, action: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_FILTER_ACTION({
      'filter-name': label,
      nature: action,
    })
  );
};

/* Votes */
export const trackVote = (
  proposalId: string,
  nature: string,
  position?: number,
  topComponent? = ''
) => {
  const cardPosition: string = getPosition(position);
  const params = { 'card-position': cardPosition, component: topComponent };
  const internalParams = { proposalId, nature };

  const { eventName, parameters } = trackingEvent.CLICK_PROPOSAL_VOTE({
    ...params,
    ...internalParams,
  });
  TrackingService.track(eventName, parameters);
  TrackingService.trackFacebookPixel(eventName, params);
  TrackingService.trackTwitterPixel(eventName);
};

export const trackFirstVote = (
  proposalId: string,
  nature: string,
  position?: number
) => {
  const cardPosition = getPosition(position);
  const params = { 'card-position': cardPosition };
  const internalParams = { proposalId, nature };

  const { eventName, parameters } = trackingEvent.CLICK_SEQUENCE_FIRST_VOTE({
    ...params,
    ...internalParams,
  });
  TrackingService.track(eventName, parameters);
  TrackingService.trackFacebookPixel(eventName, params);
  TrackingService.trackTwitterPixel(eventName);
};

export const trackUnvote = (
  proposalId: string,
  nature: string,
  position?: number,
  topComponent? = ''
) => {
  const cardPosition = getPosition(position);
  const params = { 'card-position': cardPosition, component: topComponent };
  const internalParams = { proposalId, nature };

  const { eventName, parameters } = trackingEvent.CLICK_PROPOSAL_UNVOTE({
    ...params,
    ...internalParams,
  });
  TrackingService.track(eventName, parameters);
  TrackingService.trackFacebookPixel(eventName, params);
  TrackingService.trackTwitterPixel(eventName);
};

/* Qualifications */
export const trackQualify = (
  proposalId: string,
  type: string,
  nature: string,
  position?: number,
  topComponent? = ''
) => {
  const cardPosition = getPosition(position);
  const params = { 'card-position': cardPosition, component: topComponent };
  const internalParams = { proposalId, type, nature };

  const { eventName, parameters } = trackingEvent.CLICK_PROPOSAL_QUALIFY({
    ...params,
    ...internalParams,
  });
  TrackingService.track(eventName, parameters);
  TrackingService.trackFacebookPixel(eventName, params);
  TrackingService.trackTwitterPixel(eventName);
};

export const trackUnqualify = (
  proposalId: string,
  type: string,
  nature: string,
  position?: number,
  topComponent? = ''
) => {
  const cardPosition = getPosition(position);
  const params = { 'card-position': cardPosition, component: topComponent };
  const internalParams = { proposalId, type, nature };

  const { eventName, parameters } = trackingEvent.CLICK_PROPOSAL_UNQUALIFY({
    ...params,
    ...internalParams,
  });
  TrackingService.track(eventName, parameters);
  TrackingService.trackFacebookPixel(eventName, params);
  TrackingService.trackTwitterPixel(eventName);
};

/* Sharing */
export const trackClickShare = (socialNetwork: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SHARE({
      'social-network': socialNetwork,
    })
  );
};

/* Homepage */
export const trackDisplayHomepage = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_HOMEPAGE());
};

export const trackClickHomepageConsultations = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_HOMEPAGE_CONSULTATION());
};

/** Search */
export const trackClickSubmitSearch = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_NAVBAR_SEARCH());
};

export const trackDisplaySearchMainResult = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_MAIN_RESULTS());
};

export const trackDisplaySearchProposalsResult = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_PROPOSALS());
};

export const trackDisplaySearchOragnisationsResult = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_ORGANISATIONS());
};

export const trackDisplaySearchConsultationsResult = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_CONSULTATIONS());
};

export const trackClickSearchReturn = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEARCH_RETURN());
};

/** proposal card */
export const trackClickProposalProfile = (userType: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PUBLIC_PROFILE({
      type: userType,
    })
  );
};

/** Follow Us component */
export const trackClickFollowUs = (event: SyntheticEvent<HTMLLinkElement>) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_FOLLOW_US({
      'social-network': event.currentTarget.dataset.networkName,
    })
  );
};

/** Profile */
export const trackDisplayPublicProfile = (userType: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PUBLIC_PROFILE({
      type: userType,
    })
  );
};

export const trackClickProfile = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROFILE());
};

export const trackClickPublicProfile = (
  userType: string,
  component?: string
) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PUBLIC_PROFILE({
      type: userType,
      component,
    })
  );
};

/** On Load Ideas page Tracking */
export const trackDisplayTopIdeas = (pageType: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PAGE_IDEAS({
      type: pageType,
    })
  );
};

/** Results */
export const trackDownloadReport = (extension: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_REPORT_DOWNLOAD({
      type: extension,
    })
  );
};

/** Home and Browse */
export const trackDisplayBrowseConsultations = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_BROWSE_CONSULTATIONS());
};

export const trackDisplayBrowseResults = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_BROWSE_RESULTS());
};

export const trackClickHomepageParticipate = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_HOMEPAGE_PARTICIPATE());
};

export const trackClickHomepageDiscover = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_HOMEPAGE_GREAT_CAUSES());
};

export const trackClickBrowseConsultations = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_HOMEPAGE_BROWSE_CONSULTATIONS()
  );
};

export const trackClickBrowseResults = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_HOMEPAGE_BROWSE_RESULTS()
  );
};

export const trackClickBlog = (componentName: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_VIEW_BLOG({
      component: componentName,
    })
  );
};

export const trackClickParticipate = (questionId: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_BROWSE_PARTICIPATE({
      'question-Id': questionId.toString(),
    })
  );
};

export const trackClickPageNumber = (pageNumber: number) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PAGINATION({
      'page-number': pageNumber.toString(),
    })
  );
};

export const trackClickResults = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_RESULTS());
};

export const trackDisplayResultsPage = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PAGE_RESULTS());
};

export const trackClickSubscribe = (componentName: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SUBSCRIBE({
      component: componentName,
    })
  );
};

export const trackDisplayLegalConsent = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_LEGAL_CONSENT());
};

export const trackClickCitizenRegister = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_CITIZEN_REGISTER());
};

// session
export const trackDisplaySessionExpired = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SESSION_EXPIRED());
};

// Proposal Page
export const trackDisplayProposalPage = () => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PROPOSAL_PAGE());
};

// Breadcrumbs
export const trackClickBreadcrumbs = (level: number) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_BREADCRUMBS({ level: level.toString() })
  );
};

// Cookie Modal Tracking
export const trackDisplayModalCookieFirstStep = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_COOKIE_MODAL_FIRST_STEP()
  );
};

export const trackDisplayModalCookieSecondStep = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_COOKIE_MODAL_SECOND_STEP()
  );
};

export const trackClickModalCookieRefuse = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_COOKIE_MODAL_REFUSE());
};

export const trackClickModalCookiePersonalize = () => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_MODAL_PERSONALIZE()
  );
};

export const trackClickModalCookieSave = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_MODAL_SAVE({
      type,
    })
  );
};

export const trackClickCookieSwitchAccept = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_SWITCH_ACCEPT({
      type,
    })
  );
};

export const trackClickCookieSwitchRefuse = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_SWITCH_REFUSE({
      type,
    })
  );
};

export const trackClickModalCookieBack = () => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_COOKIE_MODAL_BACK());
};

export const trackDisplayDemographics = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_DEMOGRAPHICS({
      type,
    })
  );
};

export const trackDisplayDemographicsConfirmation = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_DEMOGRAPHICS_CONFIRMATION({
      type,
    })
  );
};

export const trackClickSaveDemographics = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SAVE_DEMOGRAPHICS({
      type,
    })
  );
};

export const trackClickSkipDemographics = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SKIP_DEMOGRAPHICS({
      type,
    })
  );
};

export const trackClickVoteDemographics = (type: string) => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_VOTE_DEMOGRAPHICS({
      type,
    })
  );
};
/* eslint-disable import/no-default-export */
export default TrackingService;
