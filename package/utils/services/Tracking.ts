import { TrackingService } from './TrackingService';

const { trackingEvent } = TrackingService;

const getPosition = (cardPosition?: number): string => {
  if (cardPosition !== undefined) {
    return cardPosition.toString();
  }

  return 'single-proposal';
};

/* On Load Consultation Tracking */
export const trackDisplayOperationPage = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PAGE_OPERATION());
};

export const trackClickParticipateTab = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PARTICIPATE_TAB());
};

export const trackClickExploreTab = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_EXPLORE_TAB());
};

export const trackClickLearnMore = (component?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_BUTTON_LEARN_MORE({ component: component || '' })
  );
};

/* Open Sequence Tracking */
export const trackOpenSequence = (component?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SEQUENCE_OPEN({ component: component || '' })
  );
};

export const trackLoadMoreProposals = (
  component?: string,
  pageCount?: number
): void => {
  const pageNumber = pageCount !== undefined ? pageCount.toString() : '';

  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PROPOSAL_VIEW_MORE({
      page: pageNumber,
      component: component || '',
    })
  );
};

/* Sequence Tracking */
export const trackDisplaySequence = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEQUENCE());
};

export const trackDisplayNoProposalSequence = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_NO_PROPOSAL_SEQUENCE());
};

export const trackClickOperationPage = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_OPERATION_PAGE());
};

export const trackClickRelaunchSequence = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_RELAUNCH_SEQUENCE());
};

/* Header Tracking */
export const trackClickMakeLogo = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_MAKEORG_LOGO());
};

export const trackClickModerationLink = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_MODERATION_LINK());
};

export const trackDisplayAuthenticationForm = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_AUTHENTICATION_FORM());
};

/* Proposal Submit */
export const trackDisplayProposalField = (source?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PROPOSAL_FIELD({ ux_context: source || '' })
  );
};

export const trackClickProposalSubmit = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROPOSAL_SUBMIT());
};

export const trackDisplayProposalSubmitValidation = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PROPOSAL_SUBMIT_VALIDATION()
  );
};

export const trackDisplayPanelSignupValidation = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PANEL_SIGNUP_VALIDATION()
  );
};

export const trackClickKeepVoting = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_KEEP_VOTING());
};

export const trackDisplayForgotPasswordForm = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_FORGOTPASSWORD_FORM());
};

export const trackClickCloseModal = (modalContext: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_CLOSE_MODAL({
      context: modalContext,
    })
  );
};

export const trackingClickClosePanel = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_CLOSE_PANEL());
};

/* Sign Up */
export const trackDisplaySignupForm = (step?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_SIGN_UP_FORM({
      step: step || '',
    })
  );
};

export const trackSignupEmailSuccess = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_UP_EMAIL_SUCCESS());
};

export const trackSignupEmailFailure = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_UP_EMAIL_FAILURE());
};

/* Signin */
export const trackDisplaySigninForm = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SIGN_IN_FORM());
};

export const trackAuthenticationSocialSuccess = (
  socialNetwork: string,
  accountCreation: boolean
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.AUTHEN_SOCIAL_SUCCESS({
      'social-network': socialNetwork,
      'account-creation': accountCreation ? 'true' : 'false',
    })
  );
};

export const trackClickSocialConnect = (socialNetwork: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SOCIAL_CONNECT({
      'social-network': socialNetwork,
    })
  );
};

export const trackAuthenticationSocialFailure = (
  socialNetwork: string,
  errorMessage: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.AUTHEN_SOCIAL_FAILURE({
      'social-network': socialNetwork,
      'error-message': errorMessage,
    })
  );
};

export const trackLoginEmailSuccess = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_IN_EMAIL_SUCCESS());
};

export const trackLoginEmailFailure = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.SIGN_IN_EMAIL_FAILURE());
};

/* Sequence */
export const trackClickStartSequence = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_START_SEQUENCE());
};

export const trackClickNextCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEQUENCE_NEXT_CARD());
};

export const trackClickNextOnLastProposal = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEQUENCE_LAST_PROPOSAL());
};

export const trackClickProposalPushCardIgnore = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PROPOSAL_PUSH_CARD_IGNORE()
  );
};

export const trackClickPreviousCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEQUENCE_PREVIOUS_CARD());
};

export const trackDisplayIntroCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_INTRO_CARD());
};

export const trackDisplayProposalPushCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PROPOSAL_PUSH_CARD());
};

export const trackDisplayFinalCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_FINAL_CARD());
};

/* Votes */
export const trackVote = (
  proposalId: string,
  nature: string,
  position?: number,
  component?: string
): void => {
  const cardPosition: string = getPosition(position);
  const params = {
    'card-position': cardPosition,
    component: component || '',
    proposalId,
    nature,
  };

  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROPOSAL_VOTE(params));
};

export const trackSequenceFirstVote = (
  proposalId: string,
  nature: string,
  position?: number
): void => {
  const cardPosition = getPosition(position);
  const params = { 'card-position': cardPosition, proposalId, nature };

  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SEQUENCE_FIRST_VOTE(params)
  );
};

export const trackUnvote = (
  proposalId: string,
  nature: string,
  position?: number,
  component?: string
): void => {
  const cardPosition = getPosition(position);
  const params = {
    'card-position': cardPosition,
    component: component || '',
    proposalId,
    nature,
  };

  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROPOSAL_UNVOTE(params));
};

/* Qualifications */
export const trackQualify = (
  proposalId: string,
  type: string,
  nature: string,
  position?: number,
  component?: string
): void => {
  const cardPosition = getPosition(position);
  const params = {
    'card-position': cardPosition,
    component: component || '',
    proposalId,
    type,
    nature,
  };

  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROPOSAL_QUALIFY(params));
};

export const trackUnqualify = (
  proposalId: string,
  type: string,
  nature: string,
  position?: number,
  component?: string
): void => {
  const cardPosition = getPosition(position);
  const params = {
    'card-position': cardPosition,
    component: component || '',
    proposalId,
    type,
    nature,
  };

  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PROPOSAL_UNQUALIFY(params)
  );
};

/* Sharing */
export const trackClickShare = (socialNetwork: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SHARE({
      'social-network': socialNetwork,
    })
  );
};

/* Homepage */
export const trackDisplayHomepage = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_HOMEPAGE());
};

export const trackClickHomepageConsultations = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_HOMEPAGE_CONSULTATION());
};

/** Search */
export const trackClickSubmitSearch = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_NAVBAR_SEARCH());
};

export const trackDisplaySearchMainResult = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_MAIN_RESULTS());
};

export const trackDisplaySearchProposalsResult = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_PROPOSALS());
};

export const trackDisplaySearchOragnisationsResult = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_ORGANISATIONS());
};

export const trackDisplaySearchConsultationsResult = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SEARCH_CONSULTATIONS());
};

export const trackClickSearchReturn = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_SEARCH_RETURN());
};

/** proposal card */
export const trackClickProposalProfile = (userType: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PUBLIC_PROFILE({
      type: userType,
    })
  );
};

/** Follow Us component */
export const trackClickFollowUs = (networkName: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_FOLLOW_US({
      'social-network': networkName,
    })
  );
};

/** Profile */
export const trackDisplayPublicProfile = (userType: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PUBLIC_PROFILE({
      type: userType,
    })
  );
};

export const trackClickProfile = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_PROFILE());
};

export const trackClickPublicProfile = (
  userType: string,
  component?: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PUBLIC_PROFILE({
      type: userType || '',
      component: component || '',
    })
  );
};

/** On Load Ideas page Tracking */
export const trackDisplayTopIdeas = (pageType: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_PAGE_IDEAS({
      type: pageType,
    })
  );
};

/** Home and Browse */
export const trackDisplayBrowseConsultations = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_BROWSE_CONSULTATIONS());
};

export const trackDisplayBrowseResults = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_BROWSE_RESULTS());
};

export const trackClickHomepageParticipate = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_HOMEPAGE_PARTICIPATE());
};

export const trackClickHomepageDiscover = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_HOMEPAGE_GREAT_CAUSES());
};

export const trackClickBrowseConsultations = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_HOMEPAGE_BROWSE_CONSULTATIONS()
  );
};

export const trackClickBrowseResults = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_HOMEPAGE_BROWSE_RESULTS()
  );
};

export const trackClickBlog = (component?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_VIEW_BLOG({
      component: component || '',
    })
  );
};

export const trackClickParticipate = (questionId: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_BROWSE_PARTICIPATE({
      'question-Id': questionId.toString(),
    })
  );
};

export const trackClickPageNumber = (pageNumber: number): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_PAGINATION({
      'page-number': pageNumber.toString(),
    })
  );
};

export const trackClickResults = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_RESULTS());
};

export const trackDisplayResultsPage = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PAGE_RESULTS());
};

export const trackClickSubscribe = (component?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SUBSCRIBE({
      component: component || '',
    })
  );
};

export const trackDisplayLegalConsent = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_LEGAL_CONSENT());
};

export const trackClickCitizenRegister = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_CITIZEN_REGISTER());
};

// session
export const trackDisplaySessionExpired = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_SESSION_EXPIRED());
};

// Proposal Page
export const trackDisplayProposalPage = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_PROPOSAL_PAGE());
};

// Breadcrumbs
export const trackClickBreadcrumbs = (level: number): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_BREADCRUMBS({ level: level.toString() })
  );
};

// Cookie Modal Tracking
export const trackDisplayModalCookieFirstStep = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_COOKIE_MODAL_FIRST_STEP()
  );
};

export const trackDisplayModalCookieSecondStep = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_COOKIE_MODAL_SECOND_STEP()
  );
};

export const trackClickModalCookieRefuse = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_COOKIE_MODAL_REFUSE());
};

export const trackClickModalCookiePersonalize = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_MODAL_PERSONALIZE()
  );
};

export const trackClickModalCookieSave = (type: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_MODAL_SAVE({
      type,
    })
  );
};

export const trackClickCookieSwitchAccept = (type: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_SWITCH_ACCEPT({
      type,
    })
  );
};

export const trackClickCookieSwitchRefuse = (type: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_COOKIE_SWITCH_REFUSE({
      type,
    })
  );
};

export const trackClickModalCookieBack = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.CLICK_COOKIE_MODAL_BACK());
};

export const trackDisplayDemographics = (
  name: string,
  demographicId: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_DEMOGRAPHICS({ name, demographicId })
  );
};

export const trackDisplayDemographicsConfirmation = (
  name: string,
  demographicId: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_DEMOGRAPHICS_CONFIRMATION({
      name,
      demographicId,
    })
  );
};

export const trackClickSaveDemographics = (
  name: string,
  demographicId: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SAVE_DEMOGRAPHICS({
      name,
      demographicId,
    })
  );
};

export const trackClickSkipDemographics = (
  name: string,
  demographicId: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SKIP_DEMOGRAPHICS({
      name,
      demographicId,
    })
  );
};

export const trackClickVoteDemographics = (
  name: string,
  demographicId: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_VOTE_DEMOGRAPHICS({
      name,
      demographicId,
    })
  );
};

export const trackClickFilter = (component?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_FILTER({ component: component || '' })
  );
};

export const trackClickSort = (component?: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_SORT({ component: component || '' })
  );
};

export const trackDisplayNoResultsCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_NO_RESULTS_CARD());
};

export const trackDisplayChargeIntroCard = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_CHARGE_INTRO_CARD());
};

// Switch country/language
export const trackClickConfirmLanguageCountry = (
  newCountry: string,
  newLanguage: string
): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.CLICK_CONFIRM_LANGUAGE_COUNTRY({ newCountry, newLanguage })
  );
};

// Report a translated solution
export const trackDisplaySolutionOptionsPanel = (): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_SOLUTION_OPTIONS_PANEL()
  );
};

export const trackDisplayUntranslatedSolution = (type: string): void => {
  TrackingService.sendAllTrackers(
    trackingEvent.DISPLAY_UNTRANSLATED_SOLUTION({ type })
  );
};

export const trackDisplayReportOptions = (): void => {
  TrackingService.sendAllTrackers(trackingEvent.DISPLAY_REPORT_OPTIONS());
};

export const trackReportSolution = (type: string): void => {
  TrackingService.sendAllTrackers(trackingEvent.REPORT_SOLUTION({ type }));
};

/* eslint-disable import/no-default-export */
export default TrackingService;
