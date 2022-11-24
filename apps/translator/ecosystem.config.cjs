module.exports = {
  apps: [
    {
      name: 'production',
      script: 'dist/app-bundle.js',
      node_args: '-r dotenv/config',
      exec_mode: 'cluster',
      instances: 1,
      // interpreter: '../../node_modules/.bin/ts-node',
      // interpreter_args: '--transpileOnly',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
