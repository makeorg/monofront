/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const path = require('path');

const clientConfig = envConfigPath => ({
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'glider-js/glider-compat.min.js',
    path.resolve(__dirname, '..', 'client', 'index.js'),
  ],
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    publicPath: '/',
    sourceMapFilename: '../map/[name].js.map',
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js'],
    alias: {
      '@make.org/utils': path.resolve(__dirname, '../../utils'),
      '@make.org/api': path.resolve(__dirname, '../../api'),
      '@make.org/ui': path.resolve(__dirname, '../../ui'),
      '@make.org/components': path.resolve(__dirname, '../../components'),
      '@make.org/store': path.resolve(__dirname, '../../store'),
      '@make.org/assets': path.resolve(__dirname, '../../assets'),
      '@make.org/types': path.resolve(__dirname, '../../types'),
    },
    fallback: {
      fs: false,
    },
  },
  stats: {
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [new TerserPlugin()],
    runtimeChunk: false, // runtimeChunk + inlineSource is not compatible with loadable-component for now
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
        },
      },
    },
    concatenateModules: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        charset: 'utf-8',
        'theme-color': '#ed1844',
      },
      chunks: [], // do not inject scripts in ssr because it's managed by loadable in server/reactRender.js -> extractor.getScriptTags
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inlineSource: 'runtime~.+\\.js',
      scriptLoading: 'defer',
    }),
    new LoadablePlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../../../assets/images/favicon.png'),
      mode: 'webapp',
      prefix: 'favicon/',
      inject: false,
      favicons: {
        appName: 'Make.org',
        appDescription:
          "Give your opinion on social issues that matter to you by voting on our consultations. Together - citizens, associations, companies - let's set our priorities to make a change through concrete actions!",
        developerName: 'Make.org Team',
        background: '#ffffff',
        theme_color: '#ed1844',
        orientation: 'portrait',
        start_url: '/',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new DotEnv({
      path: envConfigPath,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        sideEffects: false,
        exclude: '/node_modules/',
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2|manifest|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
    ],
  },
  devtool: 'hidden-source-map',
});

const serverConfig = envConfigPath => ({
  // server side rendering
  target: 'node',
  context: path.resolve('.'),
  entry: [
    'core-js/stable',
    'regenerator-runtime',
    path.resolve(__dirname, '..', 'server', 'index.ts'),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    sourceMapFilename: 'map/[file].map',
  },
  node: {
    __dirname: true,
  },
  externals: [
    nodeExternals(),
    { 'webpack-manifest': './webpack-manifest.json' },
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        sideEffects: false,
        exclude: '/node_modules/',
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2|manifest|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'client/assets',
              publicPath: '/assets/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DotEnv({
      path: envConfigPath,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  devtool: 'source-map',
});

module.exports = { clientConfig, serverConfig };
