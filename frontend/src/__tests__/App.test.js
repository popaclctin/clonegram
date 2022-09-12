/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

it('renders LoadingSpinner', () => {
  render(<LoadingSpinner />);
});
