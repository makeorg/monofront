import { ProposalType } from './Proposal';
import { QuestionType, HomeQuestionType } from './Question';
import { OrganisationType } from './Organisation';

// Home view
export type FeaturedConsultationType = {
  questionSlug: string | null;
  title: string;
  description: string | null;
  landscapePicture: string;
  portraitPicture: string;
  altPicture: string;
  label: string;
  buttonLabel: string;
  internalLink: 'consultation' | 'action' | 'sequence' | null;
  externalLink: string | null;
  slot: number;
};

export type HomeHighlightsType = {
  participantsCount: number;
  proposalsCount: number;
  partnersCount: number;
};

export type HomePostType = {
  title: string;
  description: string;
  picture: string;
  link?: string | null;
};

export type HomeViewType = {
  highlights: HomeHighlightsType;
  currentQuestions: HomeQuestionType[];
  pastQuestions: HomeQuestionType[];
  featuredQuestions: HomeQuestionType[];
  posts: HomePostType[];
};

export type SearchViewsType = {
  proposals: {
    total: number;
    results: ProposalType[];
  };
  questions: {
    total: number;
    results: QuestionType[];
  };
  organisations: {
    total: number;
    results: OrganisationType[];
  };
};

export type InteractiveChildrenType = {
  inputs?: boolean;
  buttons?: boolean;
  links?: boolean;
};

export type SliderParamsType = {
  slidesToShow?: number | string;
  slidesToScroll?: number | string;
  skipTrack?: boolean;
  arrows?: {
    prev: string;
    next: string;
  };
  responsive?: SliderParamsType[];
  interactiveChildren?: InteractiveChildrenType;
  counterName?: string;
};

export type CountryWithConsulationsType = {
  countryCode: string;
  activeConsultations: boolean;
};
