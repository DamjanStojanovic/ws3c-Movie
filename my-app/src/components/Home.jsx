import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {fetchData} from "../api/api";
import MovieDetail from "./MovieDetail";
import MovieCarousel from "./MovieCarousel";

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
        <div className="container">
            <MovieCarousel title="Trending Movies" movies={popularMovies}/>
            <MovieCarousel title="Upcoming Movies" movies={upcomingMovies}/>
        </div>
    );
}

export default Home;