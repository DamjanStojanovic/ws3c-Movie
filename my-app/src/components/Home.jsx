import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {fetchData} from "../api/api";
import MovieDetail from "./MovieDetail";

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const location = useLocation();

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
                <section>
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