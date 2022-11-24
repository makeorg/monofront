const path = require('path');
const babelConfig = require('./babel.config.json');

const { paths } = require('../../tsconfig.json').compilerOptions;

function resolveTsconfigPathsToAlias() {
  const aliases = {};

  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '');
    const value = path.resolve(
      __dirname,
      '..',
      '..',
      paths[item][0].replace('/*', '').replace('*', '')
    );

    aliases[key] = value;
  });

  return aliases;
}

module.exports = {
  target: 'node',
  context: path.resolve('.'),
  mode: 'production',
  entry: {
    main: './src/index.ts',
  },
  experiments: {
    outputModule: true,
  },
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, './dist'),
    filename: 'app-bundle.js', // <--- Will be compiled to this single file
    chunkFormat: 'commonjs',
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js'],
    alias: resolveTsconfigPathsToAlias(),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            ...babelConfig,
          },
        },
        exclude: [
          '/node_modules/',
          path.resolve(__dirname, '..', '..', '..', 'node_modules'),
        ],
      },
    ],
  },
};
