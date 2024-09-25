import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    fontSize: '24px'
  };

  return (
    <header style={headerStyle}>
      Pokeverse | All Pokemon
    </header>
  );
};

export default Header;