import type { Config } from '@jest/types';
import { defaults } from 'jest-config';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  forceExit: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // clearMocks: true,
};

export default config;
