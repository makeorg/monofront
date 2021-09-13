module.exports = {
  apps: [
    {
      name: 'widget-production',
      script: 'bin/start',
      node_args: '-r dotenv/config',
      exec_mode: 'cluster',
      instances: 1,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'widget-dev',
      script: 'bin/start',
      node_args: '-r dotenv/config bin/start dotenv_config_path=.env.local',
      exec_mode: 'cluster',
      instances: 8,
      env: {
        NODE_ENV: 'test',
      },
    },
    {
      name: 'widget-test',
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
