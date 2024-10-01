import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokemonCard from './PokemonCard';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        name: 'pikachu',
        base_experience: 112,
        moves: [{ move: { name: 'thunder-shock' } }],
        sprites: { front_default: 'pikachu.png' }
      })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

const mockPokemon = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon?limit=151'
};

test('renders loading state initially', () => {
  render(<PokemonCard pokemon={mockPokemon} addToSquad={jest.fn()} removeFromSquad={jest.fn()} isInSquad={jest.fn()} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error message on fetch failure', async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));
  render(<PokemonCard pokemon={mockPokemon} addToSquad={jest.fn()} removeFromSquad={jest.fn()} isInSquad={jest.fn()} />);
  await waitFor(() => expect(screen.getByText('Failed to fetch Pokémon details. Please try again later.')).toBeInTheDocument());
});

test('renders Pokémon details correctly', async () => {
  await act(async () => {
    render(<PokemonCard pokemon={mockPokemon} addToSquad={jest.fn()} removeFromSquad={jest.fn()} isInSquad={() => false} />);
  });

  await waitFor(() => {
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Base Exp: 112')).toBeInTheDocument();
    expect(screen.getByText('Move: thunder-shock')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute('src', 'pikachu.png');
  });
});

test('shows "Add" button when Pokémon is not in squad', async () => {
  await act(async () => {
    render(<PokemonCard pokemon={mockPokemon} addToSquad={jest.fn()} removeFromSquad={jest.fn()} isInSquad={() => false} />);
  });

  await waitFor(() => {
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});

test('shows "Remove" button when Pokémon is in squad', async () => {
  await act(async () => {
    render(<PokemonCard pokemon={mockPokemon} addToSquad={jest.fn()} removeFromSquad={jest.fn()} isInSquad={() => true} />);
  });

  await waitFor(() => {
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});

test('calls addToSquad when "Add" button is clicked', async () => {
  const addToSquadMock = jest.fn();
  await act(async () => {
    render(<PokemonCard pokemon={mockPokemon} addToSquad={addToSquadMock} removeFromSquad={jest.fn()} isInSquad={() => false} />);
  });

  const addButton = await screen.findByText('Add');
  act(() => {
    fireEvent.click(addButton);
  });
  expect(addToSquadMock).toHaveBeenCalledWith(expect.objectContaining({ name: 'pikachu' }));
});

test('calls removeFromSquad when "Remove" button is clicked', async () => {
  const removeFromSquadMock = jest.fn();
  await act(async () => {
    render(<PokemonCard pokemon={mockPokemon} addToSquad={jest.fn()} removeFromSquad={removeFromSquadMock} isInSquad={() => true} />);
  });

  const removeButton = await screen.findByText('Remove');
  act(() => {
    fireEvent.click(removeButton);
  });
  expect(removeFromSquadMock).toHaveBeenCalledWith('pikachu');
});