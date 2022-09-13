import React from 'react';
import Profile from '../../components/user/Profile';
import { renderWithProviders } from '../../test-utils';

describe('<Profile />', () => {
  it('renders correctly', () => {
    const user = { id: '123' };
    const { asFragment } = renderWithProviders(<Profile user={user} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
