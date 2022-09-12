import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import LoginForm from '../components/auth/LoginForm';

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json('John Smith'), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

it('should take a snapshot', () => {
  const { asFragment } = renderWithProviders(<LoginForm />);
  expect(asFragment(<LoginForm />)).toMatchSnapshot();
});
