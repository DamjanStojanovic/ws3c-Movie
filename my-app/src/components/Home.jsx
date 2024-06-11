import React, {useEffect, useState} from "react";
import {fetchData} from "../api/api";
import MovieCarousel from "./MovieCarousel";

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

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