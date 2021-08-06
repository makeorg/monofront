module.exports = {
  apps: [
    {
      name: 'front-accessible',
      script: 'bin/start',
      node_args: '-r dotenv/config',
      exec_mode: 'cluster',
      instances: 8,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
