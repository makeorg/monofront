const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const assemblyRouter = jsonServer.create();

assemblyRouter.get('/customers', (req, res) => res.send(fixtures.customer));

assemblyRouter.get('/events', (req, res) => res.send(fixtures.event));

assemblyRouter.get('/events/:eventId/termQueries', (req, res) =>
  res.send(fixtures.termQueries)
);

assemblyRouter.get('/events/:eventId/generatedContent', (req, res) =>
  res.send(fixtures.generatedContents)
);

module.exports = assemblyRouter;
