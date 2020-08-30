import React, { useState, useEffect } from 'react';

const SearchBar = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);


console.log(scrollPosition);

const [visible, setVisible] = useState('visible')

if (scrollPosition > 50) {
  setVisible('hidden')
}
console.log(visible);

  return (
    <div className="searchBar" id="top" style={{visibility:visible}} >
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
