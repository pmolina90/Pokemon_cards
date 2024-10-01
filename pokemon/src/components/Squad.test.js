import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Squad from './Squad';

const mockSquad = [
  {
    name: 'pikachu',
    base_experience: 112,
    moves: [{ move: { name: 'thunder-shock' } }],
    sprites: { front_default: 'pikachu.png' },
  },
  {
    name: 'charizard',
    base_experience: 240,
    moves: [{ move: { name: 'flamethrower' } }],
    sprites: { front_default: 'charizard.png' },
  },
];

test('renders squad list with Pokémon details', () => {
  render(<Squad squad={mockSquad} removeFromSquad={jest.fn()} />);
  
  expect(screen.getByText('My Squad')).toBeInTheDocument();
  expect(screen.getByText('pikachu')).toBeInTheDocument();
  expect(screen.getByText('Base Exp: 112')).toBeInTheDocument();
  expect(screen.getByText('Move: thunder-shock')).toBeInTheDocument();
  expect(screen.getByAltText('pikachu')).toHaveAttribute('src', 'pikachu.png');
  
  expect(screen.getByText('charizard')).toBeInTheDocument();
  expect(screen.getByText('Base Exp: 240')).toBeInTheDocument();
  expect(screen.getByText('Move: flamethrower')).toBeInTheDocument();
  expect(screen.getByAltText('charizard')).toHaveAttribute('src', 'charizard.png');
});

test('calls removeFromSquad when "Remove" button is clicked', () => {
  const removeFromSquadMock = jest.fn();
  render(<Squad squad={mockSquad} removeFromSquad={removeFromSquadMock} />);
  
  const removeButtons = screen.getAllByText('Remove');
  fireEvent.click(removeButtons[0]);
  
  expect(removeFromSquadMock).toHaveBeenCalledWith('pikachu');
});

test('displays message when squad is empty', () => {
  render(<Squad squad='' removeFromSquad={jest.fn()} />);
  
  expect(screen.getByText('My Squad')).toBeInTheDocument();
  expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  expect(screen.queryByText('charizard')).not.toBeInTheDocument();
  expect(screen.getByText('Your squad is empty.')).toBeInTheDocument();
});