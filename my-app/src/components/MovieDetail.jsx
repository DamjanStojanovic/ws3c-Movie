import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style.css'
import {fetchData} from "../api/api";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetchData(`/movie/${id}`); // Use the fetchData function
            setMovie(data);
        };

        fetchMovie();
    }, [id]);

    if (!movie) return null;

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            {/* Add more movie details here */}
        </div>
    );
};

export default MovieDetail;