module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': () => [
      2,
      'always',
      [
        'global',
        'widget',
        'api',
        'components',
        'types',
        'assets',
        'utils',
        'ui',
      ],
    ],
    'subject-case': () => [
      2,
      'always',
      [
        'lower-case', // default
        'upper-case', // UPPERCASE
        'camel-case', // camelCase
        'kebab-case', // kebab-case
        'pascal-case', // PascalCase
        'sentence-case', // Sentence case
        'snake-case', // snake_case
        'start-case', // Start Case
      ],
    ],
  },
};
