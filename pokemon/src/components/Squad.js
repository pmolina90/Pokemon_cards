import React from 'react';

const squadContainerStyle = {
    padding: '10px',
    textAlign: 'center',
  };
  
  const squadCardStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '150px',
    position: 'relative',
  };

  const removeButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  const Squad = ({ squad, removeFromSquad }) => {
    return (
    <div style={squadContainerStyle}>
        <h2>My Squad</h2>
        {squad.map(pokemon => (
          <div key={pokemon.name} style={squadCardStyle}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Base Exp: {pokemon.base_experience}</p>
            <p>Move: {pokemon.moves[0]?.move.name}</p>
            <button style={removeButtonStyle} onClick={() => removeFromSquad(pokemon.name)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default Squad;