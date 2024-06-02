import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../api/api';

const Search = ({ setMovies }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const searchMovies = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
      <div className={`search-container ${searchOpen ? 'open' : ''}`}>
        <form id="searchForm" onSubmit={searchMovies}>
          <input
              type="text"
              className="search-input"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="search-icon"
            onClick={toggleSearch} 
          >
            &#x1F50E;&#xFE0E;
          </button>
        </form>
      </div>
  );
};

export default Search;
