const defaultHomepageQuestion = require('../db/defaultHomepageQuestion.json');
const defaultQuestion = require('../db/defaultQuestion.json');
const defaultProposal = require('../db/defaultProposal.json');
const defaultPartner = require('../db/defaultPartner.json');
const defaultPopularTag = require('../db/defaultPopularTag.json');
const defaultTag = require('../db/defaultTag.json');
const defaultVote = require('../db/defaultVote.json');
const defaultOrganisation = require('../db/defaultOrganisation.json');
const defaultHomeView = require('../db/views.json');
const defaultAgreeQualifications = require('../db/defaultAgreeQualifications.json');
const defaultDisagreeQualifications = require('../db/defaultDisagreeQualifications.json');
const defaultNeutralQualifications = require('../db/defaultNeutralQualifications.json');
const defaultTopIdea = require('../db/defaultTopIdea.json');
const defaultSequenceKeyword = require('../db/defaultSequenceKeyword.json');
const defaultDemographics = require('../db/defaultDemographics.json');

const range = (start, end) => {
  const values = [];
  let current = start;
  while (current < end) {
    values.push(current);
    current += 1;
  }
  return values;
};
const today = new Date();
const day = `0${today.getDate()}`.slice(-2);
const month = `0${today.getMonth() + 1}`.slice(-2);

const mixPastAndFutureDates = count => {
  const pastEndDate = `${
    today.getFullYear() - 1
  }-${month}-${day}T01:00:00.000Z`;
  const futureEndDate = `${
    today.getFullYear() + 1
  }-${month}-${day}T01:00:00.000Z`;

  if (count % 2 === 0) {
    return pastEndDate;
  }

  return futureEndDate;
};

const setOperationKind = count => {
  if (count % 2 === 0) {
    return 'GREAT_CAUSE';
  }

  return 'BUSINESS_CONSULTATION';
};

const setFeaturedConsultation = count => {
  if (setOperationKind(count) === 'BUSINESS_CONSULTATION') {
    return false;
  }

  return true;
};

const generateResultsLink = count => {
  if (count === 0) {
    return {
      kind: 'internal',
      value: 'results',
    };
  }

  if (count === 1) {
    return {
      kind: 'internal',
      value: 'top-ideas',
    };
  }

  if (count === 2) {
    return {
      kind: 'external',
      value: 'https://example.com',
    };
  }

  return null;
};

const generateOpenedHomepageQuestions = count => {
  const startDate = `${today.getFullYear() - 1}-${month}-${day}T01:00:00.000Z`;
  const endDate = `${today.getFullYear() + 1}-${month}-${day}T01:00:00.000Z`;

  return range(0, count).map(number => ({
    ...defaultHomepageQuestion,
    questionId: `question-${number}-id`,
    questionSlug: `question-${number}-slug`,
    startDate,
    endDate,
    question: `question-${number} ${defaultQuestion.question}`,
    shortTitle: `shortTitle-${number}`,
    operationTitle: `operation-${number}`,
  }));
};

const generateFinishedHomepageQuestions = count => {
  const startDate = `${today.getFullYear() - 2}-${month}-${day}T01:00:00.000Z`;
  const endDate = `${today.getFullYear() - 1}-${month}-${day}T01:00:00.000Z`;

  return range(0, count).map(number => ({
    ...defaultHomepageQuestion,
    questionId: `question-${number}-id`,
    questionSlug: `question-${number}-slug`,
    startDate,
    endDate,
    question: `question-${number} ${defaultQuestion.question}`,
    shortTitle: `shortTitle-${number}`,
    operationTitle: `operation-${number}`,
    resultsLink: generateResultsLink(number),
  }));
};

const generateUpcomingHomepageQuestions = count => {
  const startDate = `${today.getFullYear() + 1}-${month}-${day}T01:00:00.000Z`;
  const endDate = `${today.getFullYear() + 2}-${month}-${day}T01:00:00.000Z`;

  return range(0, count).map(number => ({
    ...defaultHomepageQuestion,
    questionId: `question-${number}-id`,
    questionSlug: `question-${number}-slug`,
    startDate,
    endDate,
    question: `question-${number} ${defaultQuestion.question}`,
    shortTitle: `shortTitle-${number}`,
    operationTitle: `operation-${number}`,
  }));
};

const generateOpenedQuestions = count => {
  const startDate = `${today.getFullYear() - 1}-${month}-${day}T01:00:00.000Z`;
  const endDate = `${today.getFullYear() + 1}-${month}-${day}T01:00:00.000Z`;

  return range(0, count).map(number => ({
    ...defaultQuestion,
    questionId: `question-${number}-id`,
    slug: `question-${number}-slug`,
    startDate,
    endDate,
    question: `question-${number} ${defaultQuestion.question}`,
    wording: {
      ...defaultQuestion.wording,
      title: `question-${number} ${defaultQuestion.wording.title}`,
      question: `question-${number} ${defaultQuestion.wording.question}`,
      description: `question-${number} ${defaultQuestion.wording.description}`,
    },
    operationKind: setOperationKind(number),
    featured: setFeaturedConsultation(number),
    timeline: {
      result: {
        date: '2021-01-14',
        dateText: 'Le 20 janvier 2020 ',
        description:
          'Nous publions les idées prioritaires issues de vos propositions.',
      },
      workshop: {
        date: '2021-01-28',
        dateText: ' Le 28 janvier ',
        description:
          'À partir de vos propositions, nous définissons avec nos partenaires et citoyens un plan d’actions collectives, mesurables et ouvertes à tous.',
      },
      action: {
        date: '2021-02-04',
        dateText: 'le 4 fevrier',
        description:
          'Début des premières actions concrètes sur le terrain pour répondre à vos priorités.',
      },
    },
    controversyCount: 15,
    topProposalCount: 15,
  }));
};

const generateClosedQuestions = count => {
  const startDate = `${today.getFullYear() - 2}-${month}-${day}T01:00:00.000Z`;
  const endDate = `${today.getFullYear() - 1}-${month}-${day}T01:00:00.000Z`;

  return range(10, count + 10).map(number => ({
    ...defaultQuestion,
    questionId: `question-${number}-id`,
    slug: `question-${number}-slug`,
    startDate,
    endDate,
    question: `question-${number} ${defaultQuestion.question}`,
    wording: {
      ...defaultQuestion.wording,
      title: `question-${number} ${defaultQuestion.wording.title}`,
      question: `question-${number} ${defaultQuestion.wording.question}`,
      description: `question-${number} ${defaultQuestion.wording.description}`,
    },
    operationKind: setOperationKind(number),
    featured: setFeaturedConsultation(number),
    timeline: {
      result: {
        date: '2021-01-14',
        dateText: 'Le 20 janvier 2020 ',
        description:
          'Nous publions les idées prioritaires issues de vos propositions.',
      },
      workshop: {
        date: '2021-01-28',
        dateText: ' Le 28 janvier ',
        description:
          'À partir de vos propositions, nous définissons avec nos partenaires et citoyens un plan d’actions collectives, mesurables et ouvertes à tous.',
      },
      action: {
        date: '2021-02-04',
        dateText: 'le 4 fevrier',
        description:
          'Début des premières actions concrètes sur le terrain pour répondre à vos priorités.',
      },
    },
    controversyCount: 15,
    topProposalCount: 15,
  }));
};

const generateQuestionsWithResults = count => {
  const startDate = `${today.getFullYear() - 2}-${month}-${day}T01:00:00.000Z`;

  return range(20, count + 20).map(number => ({
    ...defaultQuestion,
    questionId: `question-${number}-id`,
    slug: `question-${number}-slug`,
    startDate,
    endDate: mixPastAndFutureDates(number),
    displayResults: true,
    question: `question-${number} ${defaultQuestion.question}`,
    wording: {
      ...defaultQuestion.wording,
      title: `question-${number} ${defaultQuestion.wording.title}`,
      question: `question-${number} ${defaultQuestion.wording.question}`,
      description: `question-${number} ${defaultQuestion.wording.description}`,
    },
    operationKind: setOperationKind(number),
    featured: setFeaturedConsultation(number),
    timeline: {
      result: {
        date: '2021-01-14',
        dateText: 'Le 20 janvier 2020 ',
        description:
          'Nous publions les idées prioritaires issues de vos propositions.',
      },
      workshop: {
        date: '2021-01-28',
        dateText: ' Le 28 janvier ',
        description:
          'À partir de vos propositions, nous définissons avec nos partenaires et citoyens un plan d’actions collectives, mesurables et ouvertes à tous.',
      },
      action: {
        date: '2021-02-04',
        dateText: 'le 4 fevrier',
        description:
          'Début des premières actions concrètes sur le terrain pour répondre à vos priorités.',
      },
    },
    controversyCount: 15,
    topProposalCount: 15,
  }));
};

const generateProposals = (question, author, count) => {
  let countByQuestion = count;
  switch (question.slug) {
    case 'question-3-slug':
      countByQuestion = 2;
      break;
    case 'question-5-slug':
      return [];
    default:
      break;
  }

  return range(0, countByQuestion).map(number => ({
    ...defaultProposal,
    id: `proposal-${question.slug}-${number}-id`,
    slug: `proposal-${question.slug}-${number}-slug`,
    content: `proposal-${question.slug}-${number}-content`,
    question: {
      questionId: question.questionId,
      slug: question.slug,
      wording: {
        title: question.wording.title,
        question: question.wording.question,
      },
      startDate: question.startDate,
      endDate: question.endDate,
      countries: ['FR'],
      language: 'fr',
    },
    author: {
      ...defaultProposal.author,
      ...author,
    },
  }));
};

const generatePartners = count =>
  range(0, count).map(number => ({
    ...defaultPartner,
    organisationId: `partner-${number}-id`,
  }));

const generatePopularTags = count =>
  range(0, count).map(number => ({
    ...defaultPopularTag,
    tagId: `popular-tag-${number}-id`,
  }));

const generateTags = count =>
  range(0, count).map(number => ({
    ...defaultTag,
    tagId: `tag-${number}-id`,
    label: `tag-${number}-label`,
  }));

const generateOrganisations = count =>
  range(0, count).map(number => ({
    ...defaultOrganisation,
    organisationId: `organisation-${number}-id`,
    organisationName: `organisation-${number}-name`,
    slug: `organisation-${number}-slug`,
  }));

const openedHomepageQuestions = generateOpenedHomepageQuestions(6);
const finishedHomepageQuestions = generateFinishedHomepageQuestions(24);
const upcomingHomepageQuestions = generateUpcomingHomepageQuestions(4);
const openedQuestions = generateOpenedQuestions(10);
const closedQuestions = generateClosedQuestions(10);
const questionsWithResults = generateQuestionsWithResults(10);
const questions = openedQuestions
  .concat(closedQuestions)
  .concat(questionsWithResults);
const organisations = generateOrganisations(2);
const authorProposal = {
  organisationName: organisations[0].organisationName,
  organisationSlug: organisations[0].slug,
};
const proposals = questions
  .map(question => generateProposals(question, authorProposal, 24))
  .flat();
const partners = generatePartners(5);
const popularTags = generatePopularTags(4);
const tags = generateTags(4);

const generateHomeView = () => {
  const startDate = `${today.getFullYear() - 2}-${month}-${day}T01:00:00.000Z`;
  const futureEndDate = `${
    today.getFullYear() + 1
  }-${month}-${day}T01:00:00.000Z`;
  const pastEndDate = `${
    today.getFullYear() - 1
  }-${month}-${day}T01:00:00.000Z`;
  return {
    ...defaultHomeView.home,
    currentQuestions: range(0, 4).map(number => ({
      ...defaultHomeView.home.currentQuestions[0],
      questionId: questions[number].questionId,
      questionSlug: questions[number].slug,
      question: questions[number].question,
      shortTitle: `${questions[number].shortTitle}_${number}`,
      operationTitle: `${questions[number].operationTitle}_${number}`,
      consultationImage: questions[number].wording.metas.picture,
      participantsCount: `${12 + number}`,
      proposalsCount: `${12 + number}`,
      aboutUrl: questions[number].aboutUrl,
      startDate,
      endDate: futureEndDate,
    })),
    pastQuestions: range(5, 9).map(number => ({
      ...defaultHomeView.home.currentQuestions[0],
      questionId: questions[number].questionId,
      questionSlug: questions[number].slug,
      question: questions[number].question,
      shortTitle: `${questions[number].shortTitle}_${number}`,
      operationTitle: `${questions[number].operationTitle}_${number}`,
      consultationImage: questions[number].wording.metas.picture,
      participantsCount: `${12 + number}`,
      proposalsCount: `${12 + number}`,
      aboutUrl: questions[number].aboutUrl,
      startDate,
      endDate: pastEndDate,
    })),
    featuredQuestions: range(5, 8).map(number => ({
      ...defaultHomeView.home.currentQuestions[0],
      questionId: questions[number].questionId,
      questionSlug: questions[number].slug,
      question: questions[number].question,
      shortTitle: `${questions[number].shortTitle}_${number}`,
      operationTitle: `${questions[number].operationTitle}_${number}`,
      consultationImage: questions[number].wording.metas.picture,
      participantsCount: `${12 + number}`,
      proposalsCount: `${12 + number}`,
      aboutUrl: questions[number].aboutUrl,
      startDate,
      endDate: mixPastAndFutureDates(number),
    })),
  };
};
const homeView = generateHomeView();

const generateForeignHomeView = () => ({
  ...defaultHomeView.home,
  currentQuestions: [],
  pastQuestions: [],
  featuredQuestions: [],
});
const foreignHomeView = generateForeignHomeView();

const generateTopIdeas = () =>
  questions.flatMap((question, index1) =>
    range(0, 10).map(number => ({
      ...defaultTopIdea,
      id: `top-idea-id-${question.questionId}_${number}`,
      ideaId: `idea-id-${number}`,
      questionId: question.questionId,
      name: `${defaultTopIdea.name} ${question.questionId}_${number}`,
      label: `${defaultTopIdea.label} ${question.questionId}_${number}`,
      weight: defaultTopIdea.weight + number,
      proposalsCount: defaultTopIdea.proposalsCount + number,
      avatars: [
        `https://via.placeholder.com/28?text=${index1}${number}1`,
        `https://via.placeholder.com/28?text=${index1}${number}2`,
        `https://via.placeholder.com/28?text=${index1}${number}3`,
        `https://via.placeholder.com/28?text=${index1}${number}4`,
        `https://via.placeholder.com/28?text=${index1}${number}5`,
      ],
      scores: {
        totalProposalsRatio:
          defaultTopIdea.scores.totalProposalsRatio + index1 + number,
        agreementRatio: defaultTopIdea.scores.agreementRatio + index1 + number,
        likeItRatio: defaultTopIdea.scores.likeItRatio + index1 + number,
      },
      commentsCount: defaultTopIdea.commentsCount + number,
    }))
  );
const topIdeas = generateTopIdeas();

const generateKeywords = () =>
  questions.flatMap(question =>
    range(0, 5).map(number => ({
      ...defaultSequenceKeyword,
      questionId: question.questionId,
      key: `kw-${number}`,
      label: `CoeŒÊÉÈËÀÁ ÙÚÛùúûur  et ëêéèœíîï`,
      score: `10` - `${number}`,
      count: `50` - `${number}`,
    }))
  );

const keywords = generateKeywords();

const countriesWithConsultations = [
  { countryCode: 'AT', activeConsultations: false },
  { countryCode: 'BE', activeConsultations: true },
  { countryCode: 'BG', activeConsultations: true },
  { countryCode: 'CY', activeConsultations: true },
  { countryCode: 'CZ', activeConsultations: true },
  { countryCode: 'DE', activeConsultations: true },
  { countryCode: 'DK', activeConsultations: true },
  { countryCode: 'EE', activeConsultations: true },
  { countryCode: 'ES', activeConsultations: true },
  { countryCode: 'FI', activeConsultations: true },
  { countryCode: 'FR', activeConsultations: true },
  { countryCode: 'GB', activeConsultations: true },
  { countryCode: 'GR', activeConsultations: true },
  { countryCode: 'HR', activeConsultations: true },
  { countryCode: 'HU', activeConsultations: true },
  { countryCode: 'IE', activeConsultations: true },
  { countryCode: 'IT', activeConsultations: false },
  { countryCode: 'LT', activeConsultations: false },
  { countryCode: 'LV', activeConsultations: true },
  { countryCode: 'LU', activeConsultations: true },
  { countryCode: 'MT', activeConsultations: false },
  { countryCode: 'NL', activeConsultations: true },
  { countryCode: 'PL', activeConsultations: true },
  { countryCode: 'PT', activeConsultations: false },
  { countryCode: 'RO', activeConsultations: true },
  { countryCode: 'SE', activeConsultations: true },
  { countryCode: 'SI', activeConsultations: true },
  { countryCode: 'SK', activeConsultations: true },
];

const demographics = defaultDemographics;

const fixtures = {
  openedHomepageQuestions,
  finishedHomepageQuestions,
  upcomingHomepageQuestions,
  questions,
  proposals,
  partners,
  popularTags,
  tags,
  vote: defaultVote,
  homeView,
  foreignHomeView,
  organisations,
  qualifications: {
    agree: defaultAgreeQualifications,
    disagree: defaultDisagreeQualifications,
    neutral: defaultNeutralQualifications,
  },
  topIdeas,
  countriesWithConsultations,
  keywords,
  demographics,
};

module.exports = { fixtures };
