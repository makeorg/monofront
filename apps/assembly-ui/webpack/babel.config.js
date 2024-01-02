const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 2 versions', 'IE >= 11'],
      },
      useBuiltIns: 'usage',
      corejs: 3.16,
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];

const plugins = [
  '@loadable/babel-plugin',
  'convert-to-json',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-class-properties',
  [
    'babel-plugin-styled-components',
    {
      pure: true,
      displayName: false,
    },
  ],
];

module.exports = {
  presets,
  plugins,
};
