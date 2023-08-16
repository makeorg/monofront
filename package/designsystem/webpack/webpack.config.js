import { presets, plugins } from './babel.config';

const custom = {
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
    ],
  },
};

export default custom;
