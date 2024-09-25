// components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;