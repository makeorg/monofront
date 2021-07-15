/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorObjectType } from './Api';
import { HomeViewType } from './View';
import {
  QuestionType,
  QuestionResultsType,
  CountsByQuestionType,
} from './Question';
import { ProposalType } from './Proposal';
import { TagType } from './Tag';
import { PersonalityType } from './User';
import {
  DemographicNameType,
  ProposalCardType,
  SequenceCardType,
} from './Card';

// Config State
export type StateConfig = {
  readonly source: string;
  readonly language: string;
  readonly country: string;
  readonly translations: any;
  readonly countriesWithConsultations: [];
  readonly device: string;
  readonly privacyPolicy: Date;
  readonly queryParams: any;
};

// Config Homepage
export type StateViews = {
  readonly homepage?: HomeViewType;
  readonly country?: string;
};

// Proposal State
export type StateProposal = {
  readonly hasProposed: boolean;
  readonly popularProposals: ProposalType[];
  readonly error?: ErrorObjectType;
  readonly data: any; // to check
};

// Sequence State
export type StateSequence = {
  readonly currentIndex: number;
  readonly questionSlug?: string;
  readonly votedProposalIds: { [n: string]: string[] };
  readonly proposals: ProposalType[];
  readonly cards: SequenceCardType[] | ProposalCardType[];
  readonly demographics?: {
    type: DemographicNameType;
    value: string;
    questions: string[];
  };
};

// Notification State
export type StateNotification = {
  readonly banner: { contentId?: any; level?: string; params?: any };
  readonly tip: {
    id?: string;
    content?: any;
    level?: string;
    contentId?: string;
    toDismiss?: boolean;
  };
  readonly dismissed: string[];
};

// Authentication State
export type StateAuthentication = {
  readonly isLoggedIn: boolean;
  readonly errors: ErrorObjectType[];
  readonly user?: {
    userId: string;
    displayName: string;
    profile?: any;
  };
};

// Registration State
export type StateRegistration = {
  readonly errors: [];
};

// User Forgot Password State
export type StateForgotPassword = {
  readonly isSuccess: boolean;
  readonly errors: [];
};

// User Password Recovery State
export type StateUserPasswordRecovery = {
  readonly newPassword?: string;
  readonly resetToken?: string;
  readonly userId?: string;
  readonly errorMessage?: string;
  readonly error: boolean;
  readonly updated: boolean;
};

export type StateUserCookiesPreferences = {
  readonly facebook_tracking: boolean;
  readonly twitter_tracking: boolean;
  readonly facebook_sharing: boolean;
  readonly twitter_sharing: boolean;
  readonly linkedin_sharing: boolean;
};

// User State
export type StateUser = {
  readonly authentication: StateAuthentication;
  readonly passwordRecovery: StateUserPasswordRecovery;
  readonly cookiesPreferences: StateUserCookiesPreferences;
};

export type SingleStateQuestionType = {
  question: QuestionType;
  questionResults: QuestionResultsType;
  popularTags: TagType[];
  popularProposals: ProposalType[];
  personalities: PersonalityType[];
};

export type StateQuestions = {
  readonly [n: string]: SingleStateQuestionType;
};

export type StateModal = {
  readonly isOpen: boolean;
  readonly showExpirationSession: boolean;
  readonly showDataPolicy: boolean;
  readonly showCookies: boolean;
  readonly contentType: string;
  readonly focusAfterClose: boolean;
  readonly extraProps: any;
  readonly isLogin?: boolean;
};

export type StateActor = {
  readonly organisationId: string;
  readonly organisationName: string;
  readonly slug: string;
  readonly avatarUrl: string;
  readonly description: string;
  readonly public?: boolean;
  readonly proposalsCount: number;
  readonly votesCount: number;
  readonly language: string;
  readonly country: string;
  readonly website?: string;
  readonly countsByQuestion: CountsByQuestionType;
};

export type StateActors = {
  readonly total: number;
  readonly results: StateActor[];
};

export type StatePartners = {
  readonly [n: string]: {
    actors: StateActors;
  };
};

export type StatePanel = {
  readonly isExpanded: boolean;
  readonly panelContent: any;
};
export type StateSession = {
  readonly sessionId: string;
};

// All state
export type StateRoot = {
  // common data
  appConfig: StateConfig;
  views?: StateViews;
  proposal?: StateProposal;
  sequence: StateSequence;
  currentQuestion?: string;
  notifications: StateNotification;
  user?: StateUser;
  questions?: StateQuestions;
  modal: StateModal;
  partners?: StatePartners;
  panel?: StatePanel;
  session?: StateSession;
  // widget data
  question?: QuestionType;
  proposals?: ProposalType[];
};

export type Reducer<State = any, Action = any> = (
  state: State,
  action: Action
) => State;

export type ReducerAction = {
  type: string;
  payload?: any;
  user?: any;
  error?: any;
  provider?: any;
};

export type NotificationParamsType = {
  email?: string;
  questionId?: string;
};

export type NotificationType = {
  contentId?: string;
  params?: NotificationParamsType;
  level?: string;
  toDimiss?: boolean;
};

export type Dispatch = (value: any) => void;
