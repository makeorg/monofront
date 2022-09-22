const jsonServer = require('json-server');
const { fixtures } = require('../fixtures/generator');

const userRouter = jsonServer.create();

const isAuthenticated = req =>
  req.headers.cookie && req.headers.cookie.includes('mockIsConnected=true');

const validUser = {
  username: 'test@example.com',
  password: 'abcdefgh',
};

userRouter.use('/me', (req, res) => {
  res.sendStatus(401);
});

userRouter.use('/current', (req, res) => {
  if (isAuthenticated(req)) {
    res.send({
      userId: 'ae6682af-b063-41be-ace4-4d3617bdba9e',
      email: 'test@example.com',
      displayName: 'user test',
      userType: 'USER',
      roles: ['ROLE_CITIZEN'],
      hasPassword: true,
      enabled: true,
      emailVerified: true,
      country: 'FR',
      avatarUrl: 'https://assets.make.org/assets/home/hero-desktop-170720.png',
    });
  } else {
    res.sendStatus(401);
  }
});

userRouter.use('/privacy-policy', (req, res) => {
  const { email, password } = req.body;
  const now = new Date();
  if (email === validUser.username && password === validUser.password) {
    res.send({ privacyPolicyApprovalDate: now.toISOString() });
  } else {
    res.status(400).send([
      {
        field: 'email',
        key: 'invalid',
        message: 'email or password is invalid.',
      },
    ]);
  }
});

userRouter.use('/:id/profile', (req, res) => {
  if (isAuthenticated(req)) {
    res.send({
      firstName: 'user test',
      lastName: null,
      dateOfBirth: '1980-01-01',
      avatarUrl: 'https://assets.make.org/assets/home/hero-desktop-170720.png',
      profession: 'developer',
      description: null,
      postalCode: '75000',
      crmCountry: 'France',
      crmLanguage: 'Français',
      optInNewsletter: false,
      website: null,
    });
  } else {
    res.sendStatus(401);
  }
});

userRouter.use('/:id/proposals', (req, res) => {
  if (isAuthenticated(req)) {
    const proposals = fixtures.proposals.slice(0, 5);
    res.send({
      total: proposals.length,
      results: proposals,
    });
  } else {
    res.sendStatus(401);
  }
});

userRouter.use('/:i/votes', (req, res) => {
  if (isAuthenticated(req)) {
    res.send({
      total: 0,
      results: [],
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = userRouter;
