const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const sequenceRouter = jsonServer.create();

sequenceRouter.get('/standard/:questionId', (req, res) => {
  const proposalsOfQuestion = fixtures.proposals.filter(
    proposal => proposal.question.questionId === req.params.questionId
  );
  const proposals = proposalsOfQuestion.slice(0, 12);

  if (req.query && req.query.include) {
    const includes = [req.query.include].flat();
    let index = 0;
    includes.forEach(proposalId => {
      proposals[index] = fixtures.proposals.find(
        proposal => proposal.id === proposalId
      );
      index += 1;
    });
  }

  return res.send({
    proposals,
    demographics: fixtures.demographics,
  });
});

sequenceRouter.get('/consensus/:questionId', (req, res) => {
  const proposalsOfQuestion = fixtures.proposals.filter(
    proposal => proposal.question.questionId === req.params.questionId
  );

  const proposals = proposalsOfQuestion.slice(12, 24);

  if (req.query && req.query.include) {
    const includes = [req.query.include].flat();
    let index = 0;
    includes.forEach(proposalId => {
      proposals[index] = fixtures.proposals.find(
        proposal => proposal.id === proposalId
      );
      index += 1;
    });
  }

  return res.send({
    proposals,
    demographics: fixtures.demographics,
  });
});

module.exports = sequenceRouter;
