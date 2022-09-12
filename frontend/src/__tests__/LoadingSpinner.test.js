import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<LoadingSpinner />);
  expect(asFragment(<LoadingSpinner />)).toMatchSnapshot();
});
