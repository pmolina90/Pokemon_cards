import React, { useEffect, useState } from 'react';


const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'center',
  margin: '10px',
  width: '150px',
  position: 'relative',
};

const buttonStyle = {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  };


const addButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'green',
  color: 'white',
};

const removeButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'red',
  color: 'white',
};  

const PokemonCard = ({ pokemon, addToSquad, removeFromSquad, isInSquad }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setError('Failed to fetch Pokémon details. Please try again later.');
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  if (!pokemonData) {
    return <div>Loading...</div>; // Display loading message
  }

  return (
    <div style={cardStyle}>
      <h2>{pokemonData.name}</h2>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Base Exp: {pokemonData.base_experience}</p>
      <p>Move: {pokemonData.moves[0]?.move.name}</p>
      {isInSquad(pokemonData.name) ? (
        <button style={removeButtonStyle} onClick={() => removeFromSquad(pokemonData.name)}>Remove</button>
      ) : (
        <button style={addButtonStyle} onClick={() => addToSquad(pokemonData)}>Add</button>
      )}
    </div>
  );
};

export default PokemonCard;