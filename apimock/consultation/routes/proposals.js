const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const proposalsRouter = jsonServer.create();

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
