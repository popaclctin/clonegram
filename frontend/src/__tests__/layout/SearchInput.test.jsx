import React from 'react';
import SearchInput from '../../components/layout/SearchInput';
import { renderWithProviders } from '../../test-utils';

describe('<SearchInput />', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<SearchInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
