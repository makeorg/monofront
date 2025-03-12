const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const questionsRouter = jsonServer.create();

const getLimitAndSkip = (questions, req) =>
  questions.slice(
    parseInt(req.query.skip, 10),
    parseInt(req.query.limit, 10) + parseInt(req.query.skip, 10)
  );

questionsRouter.get('/', (req, res) => {
  const { status } = req.query;

  if (status === 'open') {
    return res.send({
      total: fixtures.openedHomepageQuestions.length,
      results: getLimitAndSkip(fixtures.openedHomepageQuestions, req),
    });
  }

  if (status === 'finished') {
    return res.send({
      total: fixtures.finishedHomepageQuestions.length,
      results: getLimitAndSkip(fixtures.finishedHomepageQuestions, req),
    });
  }

  if (status === 'upcoming') {
    return res.send({
      total: fixtures.upcomingHomepageQuestions.length,
      results: getLimitAndSkip(fixtures.upcomingHomepageQuestions, req),
    });
  }

  const allHomepageQuestions = fixtures.openedHomepageQuestions
    .concat(fixtures.finishedHomepageQuestions)
    .concat(fixtures.upcomingHomepageQuestions);

  return res.send({
    total: allHomepageQuestions.length,
    results: getLimitAndSkip(allHomepageQuestions, req),
  });
});

questionsRouter.get('/:questionIdOrQuestionSlug/details', (req, res) => {
  const questionDataById = fixtures.questions.find(
    question => question.questionId === req.params.questionIdOrQuestionSlug
  );
  const questionDataBySlug = fixtures.questions.find(
    question => question.slug === req.params.questionIdOrQuestionSlug
  );

  return res.send(questionDataById || questionDataBySlug);
});

questionsRouter.get('/:questionId/partners', (req, res) =>
  res.send({
    total: fixtures.partners.length,
    results: fixtures.partners,
  })
);

questionsRouter.get('/:questionId/popular-tags', (req, res) =>
  res.send(fixtures.popularTags)
);

questionsRouter.get('/:questionId/start-sequence', (req, res) => {
  const proposalsOfQuestion = fixtures.proposals.filter(
    proposal => proposal.question.questionId === req.params.questionId
  );
  let proposals;
  if (req.params.questionId === 'question-3-id') {
    proposals = proposalsOfQuestion.slice(0, 2);
  } else {
    proposals = proposalsOfQuestion.slice(0, 12);
  }

  if (req.query && req.query.include) {
    proposals[0] = fixtures.proposals.find(
      proposal => proposal.id === req.query.include
    );
  }

  return res.send({
    id: 'sequence-id',
    proposals,
  });
});

questionsRouter.get('/:questionId/top-ideas', (req, res) => {
  const questionTopIdeas = fixtures.topIdeas.filter(
    topIdea => topIdea.questionId === req.params.questionId
  );

  return res.send({
    questionTopIdeas,
    seed: 12312313,
  });
});

questionsRouter.get('/:questionId/top-ideas/:topIdeaId', (req, res) => {
  const questionTopIdeas = fixtures.topIdeas.filter(
    topIdea =>
      topIdea.questionId === req.params.questionId &&
      topIdea.id === req.params.topIdeaId
  );

  return res.send(questionTopIdeas[0] ? questionTopIdeas[0] : []);
});

questionsRouter.get('/:questionId/keywords', (req, res) => {
  const results = fixtures.keywords.filter(
    keyword => keyword.questionId === req.params.questionId
  );
  return res.send(results);
});

questionsRouter.get('/:questionId/featured-proposals', (req, res) => {
  const results = fixtures.proposals
    .filter(proposal => proposal.question.questionId === req.params.questionId)
    .slice(0, parseInt(req.query.limit, 10));
  return res.send({ results });
});

questionsRouter.use('/:questionId/proposals/:proposalId/vote', (req, res) => {
  switch (req.body.voteKey) {
    case 'agree':
      res.send(fixtures.voteAgree);
      break;
    case 'disagree':
      res.send(fixtures.voteDisagree);
      break;
    case 'neutral':
      res.send(fixtures.voteNeutral);
      break;
    default:
      res.sendStatus(400);
  }
});

questionsRouter.use('/:questionId/proposals/:proposalId/unvote', (req, res) => {
  res.send(fixtures.vote);
});

questionsRouter.use(
  '/:questionId/proposals/:proposalId/qualification',
  (req, res) => {
    const { count } = fixtures.qualifications[req.body.voteKey].find(
      qualification =>
        qualification.qualificationKey === req.body.qualificationKey
    );
    return res.send({
      qualificationKey: req.body.qualificationKey,
      hasQualified: true,
      count: `${parseInt(count, 10) + 1}`,
    });
  }
);

questionsRouter.use(
  '/:questionId/proposals/:proposalId/unqualification',
  (req, res) => {
    const { count } = fixtures.qualifications[req.body.voteKey].find(
      qualification =>
        qualification.qualificationKey === req.body.qualificationKey
    );
    return res.send({
      qualificationKey: req.body.qualificationKey,
      hasQualified: false,
      count,
    });
  }
);

questionsRouter.use('/:questionId/proposals/:proposalId', (req, res) =>
  res.send({
    ...fixtures.proposals.find(
      proposal => proposal.id === req.params.proposalId
    ),
    hasQualified: false,
  })
);

questionsRouter.use('/:questionId/proposals', (req, res) => {
  const proposalsOfQuestion = fixtures.proposals.filter(
    proposal => proposal.question.questionId === req.query.questionId
  );
  const proposals = proposalsOfQuestion.slice(
    parseInt(req.query.skip, 10),
    parseInt(req.query.limit, 10) + parseInt(req.query.skip, 10)
  );
  return res.send({
    total: proposalsOfQuestion.length,
    results: proposals,
  });
});

module.exports = questionsRouter;
