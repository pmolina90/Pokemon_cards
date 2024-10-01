import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import fetchPokemonData from './services/api';

// Mock the fetchPokemonData function
jest.mock('./services/api');

const mockPokemonData = [
  {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/'
  },
  {
    name: 'charizard',
    url: 'https://pokeapi.co/api/v2/pokemon/6/'
  },
];

describe('App Component', () => {
  beforeEach(() => {
    fetchPokemonData.mockResolvedValue(mockPokemonData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Header, Squad, and SearchBar components', async () => {
    render(<App />);

    expect(screen.getByText('My Squad')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Pokémon')).toBeInTheDocument();

    // Wait for the Pokémon data to be fetched and rendered
    await waitFor(() => {
      screen.debug(); // Debugging line to inspect the current DOM
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('charizard')).toBeInTheDocument();
    });
  });

  test('adds a Pokémon to the squad', async () => {
    render(<App />);

    // Wait for the Pokémon data to be fetched and rendered
    await waitFor(() => screen.getByText('pikachu'));

    // Assuming your PokemonCard component has a button with text 'Add to Squad'
    const addButton = screen.getAllByText('Add')[0];
    fireEvent.click(addButton);

    // Check if the Pokémon is added to the squad
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getAllByText('Remove')).toHaveLength(1);
  });

  test('removes a Pokémon from the squad', async () => {
    render(<App />);

    // Wait for the Pokémon data to be fetched and rendered
    await waitFor(() => screen.getByText('pikachu'));

    // Assuming your PokemonCard component has a button with text 'Add to Squad'
    const addButton = screen.getAllByText('Add')[0];
    fireEvent.click(addButton);

    // Remove the Pokémon from the squad
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    // Check if the Pokémon is removed from the squad
    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });

  test('filters Pokémon based on search term', async () => {
    render(<App />);

    // Wait for the Pokémon data to be fetched and rendered
    await waitFor(() => screen.getByText('pikachu'));

    const searchInput = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(searchInput, { target: { value: 'char' } });

    // Check if only the matching Pokémon is displayed
    await waitFor(() => {
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
      expect(screen.getByText('charizard')).toBeInTheDocument();
    });
  });



  test('displays an error message when fetching Pokémon data fails', async () => {
    fetchPokemonData.mockRejectedValueOnce(new Error('Failed to fetch Pokémon data'));

    render(<App />);

    // Wait for the error message to be displayed
    await waitFor(() => expect(screen.getByText('Failed to fetch Pokémon data. Please try again later.')).toBeInTheDocument());
  });
});