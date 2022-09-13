import React from 'react';
import Header from '../../components/layout/Header';
import { renderWithProviders } from '../../test-utils';

describe('<Header />', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
