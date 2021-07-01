/* @flow */

import { ApiService } from 'Shared/api/ApiService';
import { TrackingApiService } from 'Shared/api/TrackingApiService';
import trackingConfiguration from 'Shared/services/trackingConfiguration.yaml';
import * as trackingConstants from 'Shared/constants/tracking';
import { TrackingService } from 'Shared/services/TrackingService';
import { TYPE_ORGANISATION } from 'Shared/constants/user';
import Cookies from 'universal-cookie';
import { USER_PREFERENCES_COOKIE } from 'Shared/constants/cookies';
import {
  trackClickMakeLogo,
  trackDisplaySequence,
  trackClickActionsTab,
  trackDisplayOperationPage,
  trackClickHomepageConsultations,
  trackDisplaySignupForm,
  trackDisplayModerationText,
  trackDisplayAuthenticationForm,
  trackClickPersonnalDataLink,
  trackClickProposalSubmit,
  trackDisplayForgotPasswordForm,
  trackClickCloseModal,
  trackClickModerationLink,
  trackDisplayHomepage,
  trackLoadMoreProposals,
  trackUnqualify,
  trackQualify,
  trackUnvote,
  trackVote,
  trackFirstVote,
  trackDisplayFinalCard,
  trackClickPreviousCard,
  trackClickNextCard,
  trackLoginEmailFailure,
  trackLoginEmailSuccess,
  trackAuthenticationSocialFailure,
  trackAuthenticationSocialSuccess,
  trackDisplaySigninForm,
  trackSignupEmailFailure,
  trackSignupEmailSuccess,
  trackDisplayProposalSubmitValidation,
  trackClickStartSequence,
  trackDisplayBrowseConsultations,
  trackDisplayBrowseResults,
  trackClickHomepageParticipate,
  trackClickHomepageDiscover,
  trackClickBrowseConsultations,
  trackClickBrowseResults,
  trackClickBlog,
  trackClickParticipate,
  trackClickPageNumber,
  trackClickResults,
  trackClickSubscribe,
  trackDisplayProposalField,
  trackClickBackProposals,
  trackClickKeepVoting,
  trackClickNextOnLastProposal,
  trackClickParticipateTab,
  trackClickExploreTab,
  trackClickBreadcrumbs,
  trackDisplayProposalPage,
  trackClickPublicProfile,
  trackClickOperationPage,
  trackClickLearnMore,
  trackOpenSequence,
  trackDisplayModalCookieFirstStep,
  trackDisplayModalCookieSecondStep,
  trackClickModalCookieRefuse,
  trackClickModalCookieSave,
  trackClickModalCookiePersonalize,
  trackClickModalCookieBack,
  trackClickCookieSwitchAccept,
  trackClickCookieSwitchRefuse,
  trackClickCitizenRegister,
} from './Tracking';
import { FacebookTracking } from './Trackers/FacebookTracking';
import { TwitterTracking } from './Trackers/TwitterTracking';
import { trackingParamsService } from './TrackingParamsService';

const eventParameters = {
  location: 'homepage',
  source: 'foo',
  language: 'fr',
  country: 'FR',
  questionId: 'foo',
  questionSlug: 'fooSlug',
  referrer: undefined,
  url: 'http://localhost/',
};

trackingParamsService.location = eventParameters.location;
trackingParamsService.source = eventParameters.source;
trackingParamsService.country = eventParameters.country;
trackingParamsService.language = eventParameters.language;
trackingParamsService.questionId = eventParameters.questionId;
trackingParamsService.questionSlug = eventParameters.questionSlug;
trackingParamsService.referrer = eventParameters.referrer;
trackingParamsService.url = eventParameters.url;

describe('Tracking Service', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { href: eventParameters.url, pathname: '/' };
    const cookies = new Cookies();
    cookies.set(
      USER_PREFERENCES_COOKIE,
      JSON.stringify({
        facebook_tracking: true,
        twitter_tracking: true,
      }),
      {
        path: '/',
      }
    );
  });

  afterAll(() => {
    window.location = location;
  });

  beforeEach(() => {
    jest.spyOn(TrackingService, 'sendAllTrackers');
    jest.spyOn(TrackingService, 'track');
    jest.spyOn(FacebookTracking, 'trackCustom');
    jest.spyOn(TwitterTracking, 'track');
  });

  afterEach(() => {
    TrackingService.track.mockRestore();
    FacebookTracking.trackCustom.mockRestore();
    TwitterTracking.track.mockRestore();
  });

  it('track performance', async () => {
    jest.spyOn(TrackingApiService, 'trackPerformance');
    const performanceTiming = {
      connectStart: 1,
      connectEnd: 2,
      domComplete: 3,
      domContentLoadedEventEnd: 4,
      domContentLoadedEventStart: 5,
      domInteractive: 6,
      domLoading: 7,
      domainLookupEnd: 8,
      domainLookupStart: 9,
      fetchStart: 10,
      loadEventEnd: 11,
      loadEventStart: 12,
      navigationStart: 13,
      redirectEnd: 14,
      redirectStart: 15,
      requestStart: 16,
      responseEnd: 17,
      responseStart: 18,
      secureConnectionStart: 19,
      unloadEventEnd: 20,
      unloadEventStart: 21,
    };
    const response = {
      status: 204,
    };

    TrackingApiService.trackPerformance.mockResolvedValue(response);

    const performance = await TrackingService.trackPerformance(
      'foo',
      performanceTiming
    );

    expect(performance).toEqual(undefined);
  });

  it('merge default event params with passed params', () => {
    const eventName = 'fooEvent';
    const expectedBody = JSON.stringify({
      eventName,
      eventParameters,
      eventType: 'trackCustom',
    });

    jest.spyOn(ApiService, 'callApi');

    TrackingService.track(eventName, eventParameters);
    expect(ApiService.callApi).toHaveBeenNthCalledWith(1, '/tracking/front', {
      body: expectedBody,
      method: 'POST',
    });
  });

  it('track trackFacebookPixel', () => {
    TrackingService.trackFacebookPixel('eventName', eventParameters);
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      'eventName',
      eventParameters
    );
  });

  it('track trackTwitterPixel', () => {
    TrackingService.trackTwitterPixel('eventName', eventParameters);
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, 'eventName');
  });
  it('track DisplaySequence', () => {
    const eventName = trackingConfiguration.DISPLAY_SEQUENCE.key;

    trackDisplaySequence();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track open sequence with component', () => {
    const eventName = trackingConfiguration.CLICK_SEQUENCE_OPEN.key;
    const component = trackingConstants.COMPONENT_PARAM_SEQUENCE;

    trackOpenSequence(component);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      component,
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      component,
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Page Operation', () => {
    const eventName = trackingConfiguration.DISPLAY_PAGE_OPERATION.key;

    trackDisplayOperationPage();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Actions Tab', () => {
    const eventName = trackingConfiguration.CLICK_ACTIONS_TAB.key;

    trackClickActionsTab();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Participate Tab', () => {
    const eventName = trackingConfiguration.CLICK_PARTICIPATE_TAB.key;

    trackClickParticipateTab();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Explore Tab', () => {
    const eventName = trackingConfiguration.CLICK_EXPLORE_TAB.key;

    trackClickExploreTab();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track ClickMakeLogo', () => {
    const eventName = trackingConfiguration.CLICK_MAKEORG_LOGO.key;

    trackClickMakeLogo();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Moderation Text', () => {
    const eventName = trackingConfiguration.DISPLAY_MODERATION_TEXT.key;

    trackDisplayModerationText();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Moderation Text', () => {
    const eventName = trackingConfiguration.CLICK_MODERATION_LINK.key;

    trackClickModerationLink();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Authentication Form', () => {
    const eventName = trackingConfiguration.DISPLAY_AUTHENTICATION_FORM.key;

    trackDisplayAuthenticationForm();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Personnal DataLink', () => {
    const eventName = trackingConfiguration.CLICK_PERSONNAL_DATA_LINK.key;

    trackClickPersonnalDataLink();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Proposal Field', () => {
    const eventName = trackingConfiguration.DISPLAY_PROPOSAL_FIELD.key;

    trackDisplayProposalField();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Proposal Submit', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_SUBMIT.key;

    trackClickProposalSubmit();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Back Proposals', () => {
    const eventName = trackingConfiguration.CLICK_BACK_PROPOSALS.key;

    trackClickBackProposals();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Proposal Submit Validation', () => {
    const eventName =
      trackingConfiguration.DISPLAY_PROPOSAL_SUBMIT_VALIDATION.key;

    trackDisplayProposalSubmitValidation();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Keep Voting', () => {
    const eventName = trackingConfiguration.CLICK_KEEP_VOTING.key;

    trackClickKeepVoting();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Forgot Password Form', () => {
    const eventName = trackingConfiguration.DISPLAY_FORGOTPASSWORD_FORM.key;

    trackDisplayForgotPasswordForm();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Close Modal', () => {
    const eventName = trackingConfiguration.CLICK_CLOSE_MODAL.key;
    const contextName = 'MODAL_LOGIN';
    const trackParams = { context: contextName };
    const fbParams = { ...eventParameters, ...trackParams };

    trackClickCloseModal(contextName);
    expect(TrackingService.track).toHaveBeenNthCalledWith(
      1,
      eventName,
      trackParams
    );
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      fbParams
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Signup Form', () => {
    const eventName = trackingConfiguration.DISPLAY_SIGN_UP_FORM.key;

    trackDisplaySignupForm();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Signup Email Success', () => {
    const eventName = trackingConfiguration.SIGN_UP_EMAIL_SUCCESS.key;

    trackSignupEmailSuccess();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Signup Email Failure', () => {
    const eventName = trackingConfiguration.SIGN_UP_EMAIL_FAILURE.key;

    trackSignupEmailFailure();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Signin Form', () => {
    const eventName = trackingConfiguration.DISPLAY_SIGN_IN_FORM.key;

    trackDisplaySigninForm();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Authentication Social Success', () => {
    const eventName = trackingConfiguration.AUTHEN_SOCIAL_SUCCESS.key;
    const trackParams = {
      'social-network': 'foo',
      'account-creation': 'false',
    };
    const fbParams = { ...eventParameters, ...trackParams };

    trackAuthenticationSocialSuccess('foo', 'false');
    expect(TrackingService.track).toHaveBeenNthCalledWith(
      1,
      eventName,
      trackParams
    );
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      fbParams
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Authentication Social Failure', () => {
    const eventName = trackingConfiguration.AUTHEN_SOCIAL_FAILURE.key;
    const trackParams = { 'social-network': 'foo' };
    const fbParams = { ...eventParameters, ...trackParams };

    trackAuthenticationSocialFailure('foo');
    expect(TrackingService.track).toHaveBeenNthCalledWith(
      1,
      eventName,
      trackParams
    );
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      fbParams
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Login Email Success', () => {
    const eventName = trackingConfiguration.SIGN_IN_EMAIL_SUCCESS.key;

    trackLoginEmailSuccess();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Login Email Failure', () => {
    const eventName = trackingConfiguration.SIGN_IN_EMAIL_FAILURE.key;

    trackLoginEmailFailure();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Start Sequence', () => {
    const eventName = trackingConfiguration.CLICK_START_SEQUENCE.key;

    trackClickStartSequence();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Next Card', () => {
    const eventName = trackingConfiguration.CLICK_SEQUENCE_NEXT_CARD.key;

    trackClickNextCard();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Last Proposal Card', () => {
    const eventName = trackingConfiguration.CLICK_SEQUENCE_LAST_PROPOSAL.key;

    trackClickNextOnLastProposal();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Previous Card', () => {
    const eventName = trackingConfiguration.CLICK_SEQUENCE_PREVIOUS_CARD.key;

    trackClickPreviousCard();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Final Card', () => {
    const eventName = trackingConfiguration.DISPLAY_FINAL_CARD.key;

    trackDisplayFinalCard();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track First Vote', () => {
    const eventName = trackingConfiguration.CLICK_SEQUENCE_FIRST_VOTE.key;

    trackFirstVote('foo', 'bar', 999);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      nature: 'bar',
      'card-position': '999',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': '999',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Vote', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_VOTE.key;

    trackVote('foo', 'bar', 999, 'my-component');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      nature: 'bar',
      'card-position': '999',
      component: 'my-component',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': '999',
      component: 'my-component',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Unvote', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_UNVOTE.key;

    trackUnvote('foo', 'bar', 999);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      nature: 'bar',
      'card-position': '999',
      component: '',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': '999',
      component: '',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Vote on Single Proposal Card', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_VOTE.key;

    trackVote('foo', 'bar', undefined);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      nature: 'bar',
      'card-position': 'single-proposal',
      component: '',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': 'single-proposal',
      component: '',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Unvote on Single Proposal Card', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_UNVOTE.key;

    trackUnvote('foo', 'bar', undefined);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      nature: 'bar',
      'card-position': 'single-proposal',
      component: '',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': 'single-proposal',
      component: '',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Qualify', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_QUALIFY.key;

    trackQualify('foo', 'baz', 'bar', 999);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      type: 'baz',
      nature: 'bar',
      'card-position': '999',
      component: '',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': '999',
      component: '',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Unqualify', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_UNQUALIFY.key;

    trackUnqualify('foo', 'baz', 'bar', 999);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      proposalId: 'foo',
      type: 'baz',
      nature: 'bar',
      'card-position': '999',
      component: '',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'card-position': '999',
      component: '',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Load More Proposals without page number', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_VIEW_MORE.key;

    trackLoadMoreProposals('proposals');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      page: undefined,
      component: 'proposals',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      page: undefined,
      component: 'proposals',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Load More Proposals with page number', () => {
    const eventName = trackingConfiguration.CLICK_PROPOSAL_VIEW_MORE.key;
    const componentName = trackingConstants.COMPONENT_PARAM_PROPOSALS;

    trackLoadMoreProposals(componentName, 9);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      page: '9',
      component: componentName,
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      page: '9',
      component: componentName,
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Homepage', () => {
    const eventName = trackingConfiguration.DISPLAY_HOMEPAGE.key;

    trackDisplayHomepage();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Homepage Consultations', () => {
    const eventName = trackingConfiguration.CLICK_HOMEPAGE_CONSULTATION.key;

    trackClickHomepageConsultations();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Browse Consultations', () => {
    const eventName = trackingConfiguration.DISPLAY_BROWSE_CONSULTATIONS.key;
    trackDisplayBrowseConsultations();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Browse Results', () => {
    const eventName = trackingConfiguration.DISPLAY_BROWSE_RESULTS.key;
    trackDisplayBrowseResults();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Homepage Participate consultations', () => {
    const eventName = trackingConfiguration.CLICK_HOMEPAGE_PARTICIPATE.key;
    trackClickHomepageParticipate();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Homepage Discover great causes', () => {
    const eventName = trackingConfiguration.CLICK_HOMEPAGE_GREAT_CAUSES.key;
    trackClickHomepageDiscover();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Homepage Browse Consultations', () => {
    const eventName =
      trackingConfiguration.CLICK_HOMEPAGE_BROWSE_CONSULTATIONS.key;
    trackClickBrowseConsultations();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click Homepage Browse Results', () => {
    const eventName = trackingConfiguration.CLICK_HOMEPAGE_BROWSE_RESULTS.key;
    trackClickBrowseResults();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click view Blog', () => {
    const eventName = trackingConfiguration.CLICK_VIEW_BLOG.key;
    trackClickBlog('blog list');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      component: 'blog list',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      component: 'blog list',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click participate consultations', () => {
    const eventName = trackingConfiguration.CLICK_BROWSE_PARTICIPATE.key;

    trackClickParticipate(999);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      'question-Id': '999',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'question-Id': '999',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click page number', () => {
    const eventName = trackingConfiguration.CLICK_PAGINATION.key;

    trackClickPageNumber(9);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      'page-number': '9',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      'page-number': '9',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click see results', () => {
    const eventName = trackingConfiguration.CLICK_RESULTS.key;
    trackClickResults();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click susbscribe', () => {
    const eventName = trackingConfiguration.CLICK_SUBSCRIBE.key;
    trackClickSubscribe('subscribe-next-consultation');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      component: 'subscribe-next-consultation',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      component: 'subscribe-next-consultation',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Click on breadcrumbs link', () => {
    const eventName = trackingConfiguration.CLICK_BREADCRUMBS.key;

    trackClickBreadcrumbs(1);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      level: '1',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      level: '1',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track Display Proposal Page', () => {
    const eventName = trackingConfiguration.DISPLAY_PROPOSAL_PAGE.key;

    trackDisplayProposalPage();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click public profile with type parameter', () => {
    const eventName = trackingConfiguration.CLICK_PUBLIC_PROFILE.key;

    trackClickPublicProfile(TYPE_ORGANISATION);
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      type: TYPE_ORGANISATION,
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      type: TYPE_ORGANISATION,
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click public profile with type and componentparameter', () => {
    const eventName = trackingConfiguration.CLICK_PUBLIC_PROFILE.key;

    trackClickPublicProfile(TYPE_ORGANISATION, 'foo');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      type: TYPE_ORGANISATION,
      component: 'foo',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      type: TYPE_ORGANISATION,
      component: 'foo',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });
  it('track Click Operation Page link', () => {
    const eventName = trackingConfiguration.CLICK_OPERATION_PAGE.key;

    trackClickOperationPage();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click learn more', () => {
    const eventName = trackingConfiguration.CLICK_BUTTON_LEARN_MORE.key;

    trackClickLearnMore();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click learn more with component', () => {
    const eventName = trackingConfiguration.CLICK_BUTTON_LEARN_MORE.key;

    trackClickLearnMore('foo');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      component: 'foo',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      component: 'foo',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track display Modal Cookie First Step', () => {
    const eventName = trackingConfiguration.DISPLAY_COOKIE_MODAL_FIRST_STEP.key;
    trackDisplayModalCookieFirstStep();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track display Modal Cookie Second Step', () => {
    const eventName =
      trackingConfiguration.DISPLAY_COOKIE_MODAL_SECOND_STEP.key;
    trackDisplayModalCookieSecondStep();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click Modal Cookie Refuse', () => {
    const eventName = trackingConfiguration.CLICK_COOKIE_MODAL_REFUSE.key;
    trackClickModalCookieRefuse();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click Modal Cookie Personalize', () => {
    const eventName = trackingConfiguration.CLICK_COOKIE_MODAL_PERSONALIZE.key;
    trackClickModalCookiePersonalize();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click Modal Cookie Save', () => {
    const eventName = trackingConfiguration.CLICK_COOKIE_MODAL_SAVE.key;
    trackClickModalCookieSave('cookies-accept-all');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      type: 'cookies-accept-all',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      type: 'cookies-accept-all',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click Modal Switch Accept', () => {
    const eventName = trackingConfiguration.CLICK_COOKIE_SWITCH_ACCEPT.key;
    trackClickCookieSwitchAccept('facebook_tracking');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      type: 'facebook_tracking',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      type: 'facebook_tracking',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click Modal Switch Refuse', () => {
    const eventName = trackingConfiguration.CLICK_COOKIE_SWITCH_REFUSE.key;
    trackClickCookieSwitchRefuse('facebook_sharing');
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {
      type: 'facebook_sharing',
    });
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(1, eventName, {
      ...eventParameters,
      type: 'facebook_sharing',
    });
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click Modal Cookie Back', () => {
    const eventName = trackingConfiguration.CLICK_COOKIE_MODAL_BACK.key;
    trackClickModalCookieBack();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });

  it('track click citizen register', () => {
    const eventName = trackingConfiguration.CLICK_CITIZEN_REGISTER.key;
    trackClickCitizenRegister();
    expect(TrackingService.track).toHaveBeenNthCalledWith(1, eventName, {});
    expect(FacebookTracking.trackCustom).toHaveBeenNthCalledWith(
      1,
      eventName,
      eventParameters
    );
    expect(TwitterTracking.track).toHaveBeenNthCalledWith(1, eventName);
  });
});
