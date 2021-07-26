import webpack from 'webpack';
// import { merge } from 'webpack-merge';
import { clientConfig, serverConfig } from './base.config.babel.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require('webpack-merge');

// Define env file path depending from NODE_ENV
let envConfigPath = '../.env';
if (process.env.NODE_ENV === 'development') {
  envConfigPath = '../.env.local';
}
if (process.env.NODE_ENV === 'test') {
  envConfigPath = '../.env.test';
}

// Build client and server configurations
const client = clientConfig(envConfigPath);
const server = serverConfig(envConfigPath);

// Extra configurations depending from NODE_ENV
if (process.env.NODE_ENV === 'development') {
  client.mode = 'development';
  server.mode = 'development';
  client.entry.push('webpack-hot-middleware/client');
  client.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  client.mode = 'production';
  server.mode = 'production';
}

// Merging client and server configurations
const webpackConfig = [merge(client), merge(server)];

// eslint-disable-next-line import/no-default-export
export default webpackConfig;
