import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import Squad from './components/Squad';
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
  const [squad, setSquad] = useState([]);

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
  }, );

  const addToSquad = (pokemon) => {
    if (squad.length < 6 && !squad.find(p => p.name === pokemon.name)) {
      setSquad([...squad, pokemon]);
      setPokemonList(pokemonList.filter(p => p.name !== pokemon.name));
    }
  };

  const removeFromSquad = (name) => {
    const removedPokemon = squad.find(p => p.name === name);
    setSquad(squad.filter(p => p.name !== name));
    setPokemonList([...pokemonList, removedPokemon]);
  };

  const isInSquad = (name) => {
    return squad.some(p => p.name === name);
  };


  return (
    <div className="App">
      <Header squadLength={squad.length} />
      <Squad squad={squad} removeFromSquad={removeFromSquad} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <div style={containerStyle}>
        {pokemonList
          .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(pokemon => (
            <PokemonCard 
            key={pokemon.name} 
            pokemon={pokemon}
            addToSquad={addToSquad}
            removeFromSquad={removeFromSquad}
            isInSquad={isInSquad}
            />
          ))}
      </div>
    </div>
  );
}

export default App;