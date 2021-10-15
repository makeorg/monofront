/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const Dotenv = require('dotenv');
const { presets, plugins } = require('./babel.config.js');

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
    alias: {
      '@make.org/utils': path.resolve(__dirname, '..', '..', '..', 'utils'),
      '@make.org/api': path.resolve(__dirname, '..', '..', '..', 'api'),
      '@make.org/ui': path.resolve(__dirname, '..', '..', '..', 'ui'),
      '@make.org/components': path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'components'
      ),
      '@make.org/store': path.resolve(__dirname, '..', '..', '..', 'store'),
      '@make.org/assets': path.resolve(__dirname, '..', '..', '..', 'assets'),
      '@make.org/types': path.resolve(__dirname, '..', '..', '..', 'types'),
    },
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
    proxy: {
      '/backend': {
        target: process.env.LOCAL_PROXY_API_URL,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/backend': '',
        },
        cookieDomainRewrite: {
          '*': process.env.LOCAL_COOKIES_DOMAIN_REWRITE,
        },
      },
    },
  },
};
