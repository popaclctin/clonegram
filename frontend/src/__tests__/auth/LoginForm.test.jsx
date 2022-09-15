import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { renderWithProviders } from '../../test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<LoginForm />', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('logs in the user', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/email/i), 'bula@gmail.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'parola');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /log in/i })
      ).toBeInTheDocument();
    });
  });
});
