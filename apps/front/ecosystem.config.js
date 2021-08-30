module.exports = {
  apps: [
    {
      name: 'app-production',
      script: 'bin/start',
      node_args: '-r dotenv/config',
      exec_mode: 'cluster',
      instances: 8,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'app-test',
      script: 'bin/start',
      node_args: '-r dotenv/config bin/start dotenv_config_path=.env.test',
      exec_mode: 'cluster',
      instances: 8,
      env: {
        NODE_ENV: 'test',
      },
    },
  ],
};
