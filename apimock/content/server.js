const jsonServer = require('json-server');
const assemblyRouter = require('./routes/assembly.js');

const server = jsonServer.create();
const middlewares = jsonServer.defaults({ logger: false });

server.use(jsonServer.bodyParser);
server.use(middlewares);
// cors headers
server.use((req, res, next) => {
  res.header('access-control-expose-headers', 'x-visitor-id');
  next();
});

server.use('/assembly', assemblyRouter);

server.listen(9000, () => {
  console.log('JSON Server is running');
});
