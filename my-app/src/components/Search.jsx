import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api/api';

const Search = ({ setMovies }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchMovies = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
      <form id="searchForm" onSubmit={searchMovies} style={{ display: 'flex', alignItems: 'center' }}>
        <input
            type="text"
            id="searchInput"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingRight: '60px' }}
        />
        <button type="submit" id="searchButton" style={{ position: 'absolute', right: 0, top: 0 }}>
          &#x1F50E;&#xFE0E;
        </button>
      </form>
  );
};

export default Search;
