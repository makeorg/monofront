/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { paths } = require('../../../tsconfig.json').compilerOptions;

function resolveTsconfigPathsToAlias() {
  const aliases = {};

  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '');
    const value = resolve(
      __dirname,
      '..',
      '..',
      '..',
      paths[item][0].replace('/*', '').replace('*', '')
    );

    aliases[key] = value;
  });

  return aliases;
}

module.exports = resolveTsconfigPathsToAlias;
