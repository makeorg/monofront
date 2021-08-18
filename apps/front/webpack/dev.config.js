/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
    new BundleAnalyzerPlugin(),
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
    host: process.env.HOST,
    historyApiFallback: true,
    disableHostCheck: true,
    https: true,
    proxy: {
      '/backend': {
        target: 'https://api.preprod.makeorg.tech',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/backend': '',
        },
        cookieDomainRewrite: {
          '*': process.env.FRONT_URL,
        },
      },
    },
  },
};
