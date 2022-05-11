const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const proposalsRouter = jsonServer.create();

proposalsRouter.use('/:proposalId/vote', (req, res) => {
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

proposalsRouter.use('/:proposalId/unvote', (req, res) => {
  res.send(fixtures.vote);
});

proposalsRouter.use('/:proposalId/qualification', (req, res) => {
  const { count } = fixtures.qualifications[req.body.voteKey].find(
    qualification =>
      qualification.qualificationKey === req.body.qualificationKey
  );
  return res.send({
    qualificationKey: req.body.qualificationKey,
    hasQualified: true,
    count: `${parseInt(count, 10) + 1}`,
  });
});

proposalsRouter.use('/:proposalId/unqualification', (req, res) => {
  const { count } = fixtures.qualifications[req.body.voteKey].find(
    qualification =>
      qualification.qualificationKey === req.body.qualificationKey
  );
  return res.send({
    qualificationKey: req.body.qualificationKey,
    hasQualified: false,
    count,
  });
});

proposalsRouter.use('/:proposalId', (req, res) =>
  res.send({
    ...fixtures.proposals.find(
      proposal => proposal.id === req.params.proposalId
    ),
    hasQualified: false,
  })
);

proposalsRouter.use('/', (req, res) => {
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

module.exports = proposalsRouter;
