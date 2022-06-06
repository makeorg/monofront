const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const viewsRouter = jsonServer.create();

viewsRouter.get('/home-page/FR', (req, res) => {
  res.send(fixtures.homeView);
});

viewsRouter.get('/home-page/GB', (req, res) => {
  res.send(fixtures.foreignHomeView);
});

viewsRouter.get('/home-page/DE', (req, res) => {
  res.send(fixtures.foreignHomeView);
});

viewsRouter.get('/countries', (req, res) => {
  res.send(fixtures.countriesWithConsultations);
});

viewsRouter.get('/search', (req, res) => {
  res.send({
    proposals: { total: 0, results: [] },
    questions: { total: 0, results: [] },
    organisations: { total: 0, results: [] },
  });
});

module.exports = viewsRouter;
