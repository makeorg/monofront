/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const Dotenv = require('dotenv');
const { presets, plugins } = require('./babel.config.js');
const resolveTsconfigPathsToAlias = require('./resolveTsconfigPathsToAlias.js');

const devConfig = envConfigPath => ({
  entry: './client/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets,
            plugins,
          },
        },
      },
      {
        test: /\.(woff|woff2|svg|png|jpe?g|ya?ml)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'yaml'],
    alias: resolveTsconfigPathsToAlias(),
    fallback: { crypto: false },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
    }),
    new DotenvWebpack({
      path: envConfigPath,
    }),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: process.env.PORT,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    https: JSON.parse(process.env.USE_LOCAL_CERTS),
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: true, // enable polling since fsevents are not supported in docker
    },
  },
});

// Define env file path depending from NODE_ENV
let envConfigPath = path.resolve(__dirname, '..', '.env');

if (process.env.NODE_ENV === 'mock') {
  envConfigPath = path.resolve(__dirname, '..', '.env.mock');
  Dotenv.config({ path: './.env.mock' });
} else {
  envConfigPath = path.resolve(__dirname, '..', '.env.local');
  Dotenv.config({ path: './.env.local' });
}

module.exports = devConfig(envConfigPath);
