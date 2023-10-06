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

// instrument code for coverage
if (process.env.NODE_ENV === 'test') {
  plugins.push('istanbul');
}

module.exports = {
  presets,
  plugins,
};
