import React, { useState } from 'react';
import './style.css'

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzNjZmViODM3ZGY4NzM5ZjRhZjRlMDBjZGFlMzBjYSIsInN1YiI6IjY1MzYxZjMxMmIyMTA4MDBhZTUyZGIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S0kcWgOPEHSXh9vNVpZninvf6yUPCupMPKOTjBSTkZg'
      }
    };

    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`, options);
    const data = await response.json();

    setMovies(data.results);
  };

  return (
      <div className="container">
        <section className="row colset-2-its">
          <form id="searchForm" onSubmit={searchMovies}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input type="text" id="searchInput" placeholder="Search for movies..." style={{ paddingRight: '60px' }} value={query} onChange={(e) => setQuery(e.target.value)} />
              <button type="submit" id="searchButton" style={{ position: 'absolute', right: 0, top: 0 }}>
                &#x1F50E;&#xFE0E;
              </button>
            </div>
          </form>
          <div id="results">
            {movies.map((movie) => (
                <div key={movie.id}>
                  <a href={`movie/${movie.id}`}>
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg'} alt={movie.title} data-movie-id={movie.id} />
                  </a>
                  <p>{movie.title}</p>
                </div>
            ))}
          </div>
        </section>
      </div>
  );
}

export default App;