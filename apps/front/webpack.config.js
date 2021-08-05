/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/index.tsx',
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
        test: /\.(woff|woff2|svg|png|jpe?g)$/,
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
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
    }),
    new Dotenv({
      path: './.env.local', // load this now instead of the ones in '.env'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 3000,
    hot: true,
    host: 'local.makeorg.tech',
    historyApiFallback: true,
    disableHostCheck: true,
    https: true,
  },
};
