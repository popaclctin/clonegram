import React from 'react';
import SignupForm from '../../components/auth/SignupForm';
import { renderWithProviders } from '../../test-utils';

describe('<SignupForm />', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<SignupForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
