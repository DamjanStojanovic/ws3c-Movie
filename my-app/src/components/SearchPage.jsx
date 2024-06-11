import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchData } from '../api/api';
import '../styles/Search.css';

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
                  <div key={movie.id} className="movie-item glassmorphism-effect">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title}/>
                      <p>{movie.title}</p>
                    </Link>
                  </div>
              ) : null
          ))}
        </div>
      </div>
  );
};

export default SearchPage;
