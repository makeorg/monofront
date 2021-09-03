import { PartnerType, QuestionType } from '@make.org/types';
import {
  getQuestionFromState,
  isGreatCause,
  orderPartnersByWeight,
} from './question';

describe('isGreatCause', () => {
  it('operationKind as great cause', () => {
    expect(isGreatCause('GREAT_CAUSE')).toEqual(true);
  });

  it('operationKind !== GREAT_CAUSE', () => {
    expect(isGreatCause('foo')).toEqual(false);
  });
});

describe('orderPartnersByWeight', () => {
  const partner1: PartnerType = {
    name: 'foo',
    partnerKind: 'ACTOR',
    weight: 0,
  };
  const partner2: PartnerType = {
    name: 'bar',
    partnerKind: 'MEDIA',
    weight: 5,
  };

  it('receive weights for partner1 & partner2', () => {
    expect(orderPartnersByWeight(partner1, partner2)).toBe(0);
  });
});

describe('getQuestionFromState', () => {
  const mockedSlug = 'foo';
  const mockedQuestion: QuestionType = {
    questionId: '1234',
    slug: mockedSlug,
    operationId: '1234',
    wording: {
      question: 'foo',
      description: 'foo',
      title: 'foo',
      metas: {
        title: 'foo',
        description: 'foo',
        picture: 'foo',
      },
    },
    activeFeatureData: {
      topProposal: null,
    },
    countries: ['FR'],
    language: 'fr',
    allowedSources: ['foo'],
    question: 'foo',
    landingSequenceId: 'foo',
    canPropose: true,
    operationKind: 'GREAT_CAUSE',
    sequenceConfig: {},
    aboutUrl: 'foo',
    partners: [{ name: 'foo', partnerKind: 'ACTOR', weight: 0 }],
    theme: {},
    displayResults: false,
    operation: { questions: [] },
    activeFeatures: [],
    featured: false,
    highlights: {
      votesCount: 0,
      votesTarget: 0,
      participantsCount: 0,
      proposalsCount: 0,
    },
    timeline: {},
    controversyCount: 0,
    topProposalCount: 0,
    startDate: '',
    endDate: '',
  };

  const state = {
    foo: {
      question: mockedQuestion,
    },
  };

  it("doesn't find question from state", () => {
    expect(getQuestionFromState(state, 'bar')).toEqual(null);
  });

  it('return the question from state', () => {
    expect(getQuestionFromState(state, mockedSlug)).toEqual(mockedQuestion);
  });
});
