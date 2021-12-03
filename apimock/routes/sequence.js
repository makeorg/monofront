/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonServer = require('json-server');
const { votes } = require('../db/defaultProposal.json');

const { fixtures } = require('../fixtures/generator');

const sequenceRouter = jsonServer.create();

// update default proposal votes with voted neutral vote
const defaultVotes = votes;
const newVotesWithNeutralVoted = [
  ...defaultVotes,
  defaultVotes[2].hasVoted === true,
];

sequenceRouter.get('/standard/:questionId', (req, res) => {
  const proposalsOfQuestion = fixtures.proposals.filter(
    proposal => proposal.question.questionId === req.params.questionId
  );
  const proposals = proposalsOfQuestion.slice(0, 12);

  if (req.query && req.query.include) {
    const includes = [req.query.include].flat();
    let index = 0;
    includes.forEach(proposalId => {
      const currentProposal = fixtures.proposals.find(
        proposal => proposal.id === proposalId
      );
      proposals[index] = {
        ...currentProposal,
        votes: newVotesWithNeutralVoted,
      };
      index += 1;
    });
  }

  return res.send({
    proposals,
    demographics: fixtures.demographics,
  });
});

// start standard sequence first proposal
sequenceRouter.get('/standard/:questionId/first-proposal', (req, res) => {
  const proposalsOfQuestion = fixtures.proposals.filter(
    proposal => proposal.question.questionId === req.params.questionId
  );
  const proposal = proposalsOfQuestion.pop();
  const sequenceSize = 12;

  return res.send({
    proposal,
    sequenceSize,
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
