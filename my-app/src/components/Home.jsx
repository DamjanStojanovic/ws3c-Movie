import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {fetchData} from "../api/api";
import MovieDetail from "./MovieDetail";

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const location = useLocation();

    const loadPopularMovies = async () => {
        const data = await fetchData('/movie/popular?language=en-US&page=1');
        setPopularMovies(data.results);
    };

    const loadUpcomingMovies = async () => {
        const data = await fetchData('/movie/upcoming?language=en-US&page=1');
        setUpcomingMovies(data.results);
    };

    useEffect(() => {
        loadPopularMovies();
        loadUpcomingMovies();
    }, []);

    return (
        location.pathname.startsWith('/movie/') ? (
            <Routes>
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
        ) : (
            <div className="container">
                <section>
                    <h2>Popular Movies</h2>
                    <div id="popular-movies">
                        {popularMovies.map((movie) => (
                            movie.poster_path && movie.title && movie.title.trim() !== '' ? (
                                <div className="movie">
                                    <div key={movie.id} className="result-item">
                                        <Link to={`movie/${movie.id}`} className="movieTitle">
                                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                alt={movie.title}
                                                data-movie-id={movie.id}/>
                                        </Link>
                                    </div>
                                    <Link to={`movie/${movie.id}`} className="movieTitle">
                                        <p>{movie.title}</p>
                                    </Link>
                                </div>
                            ) : null
                        ))}
                    </div>
                    <div>
                        <h2>Upcoming Movies</h2>
                        <div id="upcoming-movies">
                            {upcomingMovies.map((movie) => (
                                movie.poster_path && movie.title && movie.title.trim() !== '' ? (
                                    <div className="movie">
                                        <div key={movie.id} className="result-item">
                                            <Link to={`movie/${movie.id}`} className="movieTitle">
                                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                    alt={movie.title}
                                                    data-movie-id={movie.id}/>
                                            </Link>
                                        </div>
                                        <Link to={`movie/${movie.id}`} className="movieTitle">
                                            <p>{movie.title}</p>
                                        </Link>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    );
}

export default Home;