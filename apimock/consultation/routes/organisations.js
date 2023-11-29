const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const organisationsRouter = jsonServer.create();

organisationsRouter.get('/:organisationId/proposals', (req, res) => {
  const organisation = fixtures.organisations.find(
    orga => orga.organisationId === req.params.organisationId
  );

  const proposals = fixtures.proposals
    .filter(proposal => proposal.author.organisationSlug === organisation.slug)
    .slice(
      parseInt(req.query.skip, 10),
      parseInt(req.query.limit, 10) + parseInt(req.query.skip, 10)
    );

  return res.send({
    total: proposals.length,
    results: proposals,
  });
});

organisationsRouter.get('/:organisationId/votes', (req, res) => {
  const organisation = fixtures.organisations.find(
    orga => orga.organisationId === req.params.organisationId
  );

  const proposals = fixtures.proposals.filter(
    proposal => proposal.author.organisationSlug !== organisation.slug
  );

  return res.send({
    total: proposals.length,
    results: proposals.map(proposal => ({
      proposal,
      vote: 'agree',
      voteDate: '2019-12-30T15:37:24.614Z',
      voteDetails: {
        ...fixtures.vote,
        voteKey: 'agree',
      },
    })),
  });
});

organisationsRouter.get('/', (req, res) => {
  const organisations = req.query.slug
    ? fixtures.organisations.filter(
        organisation => organisation.slug === req.query.slug
      )
    : fixtures.organisations;
  return res.send({
    total: organisations.length,
    results: organisations,
  });
});

module.exports = organisationsRouter;
