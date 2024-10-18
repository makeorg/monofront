const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const resultsRouter = jsonServer.create();

resultsRouter.get('/', (req, res) => {
  return res.send([{id: "1", questionId:"123", data : fixtures.results}])
}
);

module.exports = resultsRouter;
