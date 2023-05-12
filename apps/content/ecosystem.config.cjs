module.exports = {
    apps: [
      {
        name: 'production',
        script: 'dist/apps/content/src/main.js',
        node_args: '-r dotenv/config',
        exec_mode: 'cluster',
        instances: 1,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
