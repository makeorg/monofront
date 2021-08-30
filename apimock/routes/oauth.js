const jsonServer = require('json-server');

const oauthRouter = jsonServer.create();

const validUser = {
  username: 'test@example.com',
  password: 'abcdefgh',
};

oauthRouter.post('/make_access_token', (req, res) => {
  const { username, password, grant_type: grantType } = req.body;
  const now = new Date();
  if (
    username === validUser.username &&
    password === validUser.password &&
    grantType === 'password'
  ) {
    res
      .cookie('mockIsConnected', true, {
        sameSite: true,
        httpOnly: true,
        secure: false,
      })
      .send({
        token_type: 'Bearer',
        access_token: '1000000d-100f-11b2-9bff-00000000000a',
        expires_in: 300,
        refresh_token: '2000000d-100f-11b2-9bff-00000000000b',
        refresh_expires_in: 1500,
        created_at: now.toISOString(),
      });
  } else {
    res.status(400).send({
      field: 'authentication',
      key: 'invalid_grant',
      message: 'username or password is incorrect',
    });
  }
});

module.exports = oauthRouter;
