import '@testing-library/jest-dom';

jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: 'mock-font-geist',
  }),
  Geist_Mono: () => ({
    variable: 'mock-font-geist-mono',
  }),
}));

// Suppress console.error for all tests
jest.spyOn(console, 'error').mockImplementation(() => {});
