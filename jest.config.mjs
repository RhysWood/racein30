import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^/utils/(.*)$': '<rootDir>/src/app/utils/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};

const customJestConfig = createJestConfig(config);

export default customJestConfig;
