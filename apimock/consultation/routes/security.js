const jsonServer = require('json-server');

const securityRouter = jsonServer.create();

securityRouter.post('/secure-hash', (req, res) => {
  const { hash } = req.body;
  if (hash === 'fake-hash-id') {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

module.exports = securityRouter;
