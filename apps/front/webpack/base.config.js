/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { presets, plugins } = require('./babel.config.js');

const clientConfig = envConfigPath => ({
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'glider-js/glider-compat.min.js',
    path.resolve(__dirname, '..', 'client', 'index.tsx'),
  ],
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    publicPath: '/',
    pathinfo: false,
    sourceMapFilename: '../map/[name].js.map',
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.yaml', '.json'],
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
    concatenateModules: true,
    runtimeChunk: true,
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
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      filename: './index.html',
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
    new WebpackManifestPlugin({
      fileName: '../webpack-manifest.json',
    }),
    new LoadablePlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'images',
        'favicon.png'
      ),
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
        test: /\.(ts)x?$/,
        exclude: [
          '/node_modules/',
          path.resolve(__dirname, '..', '..', '..', 'node_modules'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets,
            plugins,
          },
        },
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
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
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
    pathinfo: false,
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    sourceMapFilename: 'map/[file].map',
  },
  node: {
    __dirname: true,
  },
  externals: [
    nodeExternals({ allowlist: ['history'] }),
    {
      'webpack-manifest': './webpack-manifest.json',
      sharp: 'commonjs sharp',
    },
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.yaml', '.json'],
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
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: [
          '/node_modules/',
          path.resolve(__dirname, '..', '..', '..', '..', 'node_modules'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets,
            plugins,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2|manifest|ico|yaml)$/,
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
