import '@testing-library/jest-dom';
import { server } from './mocks/api/msw-server';

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());
