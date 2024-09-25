import React, { useEffect, useState } from 'react';


const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'center',
  margin: '10px',
  width: '150px'
};

const PokemonCard = ({ pokemon }) => {
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
    </div>
  );
};

export default PokemonCard;