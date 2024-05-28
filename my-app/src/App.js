import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './style.css'
import NewPage from './NewPage';
import MovieDetail from './components/MovieDetail';
import {fetchData} from "./api/api";

function App() {
  return (
      <Router>
        <AppContent />
      </Router>
  );
}

function AppContent() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const searchMovies = async (e) => {
    e.preventDefault();

      const data = await fetchData(`/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`);

      setMovies(data.results);
  };

  return (
      location.pathname.startsWith('/movie/') ? (
          <Routes>
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
      ) : (
          <div className="container">
              <section className="row colset-2-its">
                  <form id="searchForm" onSubmit={searchMovies}>
                      <div style={{position: 'relative', display: 'inline-block'}}>
                          <input type="text" id="searchInput" placeholder="Search for movies..."
                                 style={{paddingRight: '60px'}} value={query}
                                 onChange={(e) => setQuery(e.target.value)}/>
                          <button type="submit" id="searchButton" style={{position: 'absolute', right: 0, top: 0}}>
                              &#x1F50E;&#xFE0E;
                          </button>
                      </div>
                  </form>
                  <div id="results">
                      {movies.map((movie) => (
                          movie.poster_path && movie.title && movie.title.trim() !== '' ? (
                              <div key={movie.id}>
                                  <Link to={`movie/${movie.id}`}>
                                      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}
                                           data-movie-id={movie.id}/>
                                  </Link>
                                  <p>{movie.title}</p>
                              </div>
                          ) : null
                      ))}
                  </div>
              </section>
              <Routes>
                  <Route path="/new-page" element={<NewPage/>}/>
                  <Route path="/movie/:id" element={<MovieDetail/>}/>
              </Routes>
          </div>
      )
  );
}

export default App;