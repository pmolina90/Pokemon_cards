import React from 'react';

const Header = ({ squadLength }) => {
  const headerStyle = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    fontSize: '24px',
    position: 'relative'
  };

  const buttonStyle = {
    position: 'absolute',
    right: '20px',
    top: '10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    display: squadLength >= 2 ? 'inline-block' : 'none'
  }

  return (
    <header style={headerStyle}>
      Pokeverse | All Pokemon
      <button style={buttonStyle}>Battle</button>
    </header>
  );
};

export default Header;