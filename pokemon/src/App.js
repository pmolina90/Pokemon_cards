import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import fetchPokemonData from './services/api';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPokemonData();
        setPokemonList(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setError('Failed to fetch Pokémon data. Please try again later.');
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <div style={containerStyle}>
        {pokemonList
          .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(pokemon => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
}

export default App;