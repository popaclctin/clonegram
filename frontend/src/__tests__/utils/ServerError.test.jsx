import React from 'react';
import ServerError from '../../components/utils/ServerError';
import { renderWithProviders } from '../../test-utils';

describe('<ServerError />', () => {
  it('renders correctly', () => {
    const error = { data: { message: 'This is a test' } };
    const { asFragment } = renderWithProviders(<ServerError error={error} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
