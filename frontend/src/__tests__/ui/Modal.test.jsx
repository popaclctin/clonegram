import React from 'react';
import Modal from '../../components/ui/Modal';
import { renderWithProviders } from '../../test-utils';

describe('<Modal />', () => {
  it('renders correctly', () => {
    const root = document.createElement('div');
    const onClick = jest.fn();
    const { asFragment } = renderWithProviders(
      <Modal onClick={onClick} root={root} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
