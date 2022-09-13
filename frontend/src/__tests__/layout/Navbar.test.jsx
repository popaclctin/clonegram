import React from 'react';
import Navbar from '../../components/layout/Navbar';
import { renderWithProviders } from '../../test-utils';

describe('<Navbar />', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
