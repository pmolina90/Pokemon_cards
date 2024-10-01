import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

test('renders the header with correct text', () => {
  const { getByText } = render(<Header squadLength={0} />);
  expect(getByText('Pokeverse | All Pokemon')).toBeInTheDocument();
});

test('hides the Battle button when squadLength is less than 2', () => {
  const { getByText } = render(<Header squadLength={1} />);
  const battleButton = getByText('Battle');
  expect(battleButton).not.toBeVisible();
});

test('shows the Battle button when squadLength is 2 or more', () => {
  const { getByText } = render(<Header squadLength={2} />);
  const battleButton = getByText('Battle');
  expect(battleButton).toBeVisible();
});

test('shows the Battle button when squadLength is greater than 2', () => {
  const { getByText } = render(<Header squadLength={3} />);
  const battleButton = getByText('Battle');
  expect(battleButton).toBeVisible();
});