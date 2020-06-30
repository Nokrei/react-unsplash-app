import React from 'react';

const SearchBar = (props) => {
  return (
    <div className="searchBar">
      <h1>React - Unsplash image search</h1>
      <input
        type="text"
        placeholder="Search for images"
        spellCheck="false"
        value={props.value}
        onChange={props.handleChange}
        onKeyDown={props.handleKeyDown}
      />
      <button className="button" onClick={props.handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
