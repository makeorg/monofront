/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const Dotenv = require('dotenv');
// const { responseInterceptor } = require('http-proxy-middleware');
const { readFileSync } = require('fs');
const querystring = require('querystring');
const { presets, plugins } = require('./babel.config.js');
const resolveTsconfigPathsToAlias = require('./resolveTsconfigPathsToAlias.js');

Dotenv.config({ path: './.env.local' });

module.exports = {
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
    fallback: { path: false, fs: false },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, '..', '.env.local'), // load this now instead of the ones in '.env'
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
    https: JSON.parse(process.env.LOCAL_USE_CERTS),
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: true, // enable polling since fsevents are not supported in docker
    },
    before: app => {
      app.post('/api/logger', async (req, res) => {
        res.send('APi logger');
      });
      app.get('/demo', async (req, res) => {
        res.type('text/html');

        const demoTemplate = readFileSync(
          path.resolve(__dirname, '../demo-iframe.html'),
          { encoding: 'utf8', flag: 'r' }
        );

        return res.send(
          demoTemplate.replace(
            '__URL__',
            `/?${new URLSearchParams(req.query).toString()}`
          )
        );
      });
    },
    proxy: {
      '/backend': {
        target: process.env.API_URL_SERVER_SIDE,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/backend': '',
        },
        cookieDomainRewrite: {
          '*': new URL(process.env.FRONT_URL).hostname,
        },
      },
    },
  },
};
