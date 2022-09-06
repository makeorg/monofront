import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'yaml', 'ts', 'tsx'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
    '^.+\\.ya?ml$': 'yaml-jest',
    '\\.yaml$': 'jest-transform-yaml',
  },
  snapshotSerializers: [require.resolve('snapshot-diff/serializer.js')],
  setupFilesAfterEnv: ['<rootDir>/test/setup.tsx'],
  testPathIgnorePatterns: ['\\.snap$', '\\.svg$', '<rootDir>/node_modules/'],
};

export default config;
