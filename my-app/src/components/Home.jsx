import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {fetchData} from "../api/api";
import MovieDetail from "./MovieDetail";

function Home() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const location = useLocation();

    const searchMovies = async (e) => {
        e.preventDefault();
        const data = await fetchData(`/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`);
        setMovies(data.results);
    };

    const loadPopularMovies = async () => {
        const data = await fetchData('/movie/popular?language=en-US&page=1');
        setPopularMovies(data.results);
    };

    useEffect(() => {
        loadPopularMovies();
    }, []);

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
                    <h2>Popular Movies</h2>
                    <div id="popular-movies">
                        {popularMovies.map((movie) => (
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
            </div>
        )
    );
}

export default Home;