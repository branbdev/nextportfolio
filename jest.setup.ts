import '@testing-library/jest-dom';

// Polyfill for Next.js router if needed in future tests
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
}));
