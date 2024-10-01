import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

test('renders input field with initial value', () => {
  const mockSetSearchTerm = jest.fn();
  render(<SearchBar searchTerm="pikachu" setSearchTerm={mockSetSearchTerm} />);
  
  const input = screen.getByPlaceholderText('Search Pokémon');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('pikachu');
});

test('calls setSearchTerm with the correct value when typing', () => {
  const mockSetSearchTerm = jest.fn();
  render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);
  
  const input = screen.getByPlaceholderText('Search Pokémon');
  fireEvent.change(input, { target: { value: 'charizard' } });
  
  expect(mockSetSearchTerm).toHaveBeenCalledWith('charizard');
});

test('updates input field value when typing', () => {
  const TestComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  };

  render(<TestComponent />);
  
  const input = screen.getByPlaceholderText('Search Pokémon');
  fireEvent.change(input, { target: { value: 'bulbasaur' } });
  
  expect(input).toHaveValue('bulbasaur');
});