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
  const partner1 = { weight: 0 };
  const partner2 = { weight: 5 };
  const partner1NoWeight = { weight: null };
  const partner2NoWeight = { weight: null };

  it('no weight for both questions', () => {
    expect(orderPartnersByWeight(partner1NoWeight, partner2NoWeight)).toBe(0);
  });

  it('no weight for partner1', () => {
    expect(orderPartnersByWeight(partner1NoWeight, partner2)).toBe(-1);
  });

  it('no weight for partner2', () => {
    expect(orderPartnersByWeight(partner1, partner2NoWeight)).toBe(1);
  });

  it('receive weights for partner1 & partner2', () => {
    expect(orderPartnersByWeight(partner1, partner2)).toBe(0);
  });
});

describe('getQuestionFromState', () => {
  const mockedSlug = 'foo';
  const mockedQuestion = {
    questionId: '1234',
    slug: mockedSlug,
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
