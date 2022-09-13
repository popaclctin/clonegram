import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { renderWithProviders } from '../../test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('<LoginForm />', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
