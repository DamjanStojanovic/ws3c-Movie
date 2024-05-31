import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchData } from '../api/api';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const searchMovies = async () => {
      const data = await fetchData(`/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`);
      setMovies(data.results);
    };

    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
      <div className="container">
        <h2>Search Results for "{query}"</h2>
        <div id="results" className="movie-grid">
          {movies.map((movie) => (
              movie.poster_path && movie.title && movie.title.trim() !== '' ? (
                  <div key={movie.id} className="movie-item">
                    <Link to={`/movie/${movie.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    </Link>
                    <p>{movie.title}</p>
                  </div>
              ) : null
          ))}
        </div>
      </div>
  );
};

export default SearchPage;
