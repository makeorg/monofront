/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const path = require('path');
const { clientConfig, serverConfig } = require('./base.config.js');

// Define env file path depending from NODE_ENV
let envConfigPath = path.resolve(__dirname, '..', '.env');
if (process.env.NODE_ENV === 'development') {
  envConfigPath = path.resolve(__dirname, '..', '.env.local');
}
if (process.env.NODE_ENV === 'test') {
  envConfigPath = path.resolve(__dirname, '..', '.env.test');
}

// Build client and server configurations
const client = clientConfig(envConfigPath);
const server = serverConfig(envConfigPath);

// Extra configurations depending from NODE_ENV
if (process.env.NODE_ENV === 'development') {
  client.mode = 'development';
  server.mode = 'development';
} else {
  client.mode = 'production';
  server.mode = 'production';
}

// Merging client and server configurations
const webpackConfig = [merge(client), merge(server)];

// eslint-disable-next-line import/no-default-export
module.exports = webpackConfig;
