import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

describe('<LoadingSpinner />', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<LoadingSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
