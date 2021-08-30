/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        sideEffects: false,
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'yaml'],
    alias: {
      '@make.org/utils': path.resolve(__dirname, '../../utils'),
      '@make.org/api': path.resolve(__dirname, '../../api'),
      '@make.org/ui': path.resolve(__dirname, '../../ui'),
      '@make.org/components': path.resolve(__dirname, '../../components'),
      '@make.org/store': path.resolve(__dirname, '../../store'),
      '@make.org/assets': path.resolve(__dirname, '../../assets'),
      '@make.org/types': path.resolve(__dirname, '../../types'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
    }),
    new Dotenv({
      path: './.env.local', // load this now instead of the ones in '.env'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    https: true,
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: true, // enable polling since fsevents are not supported in docker
    },
  },
};
