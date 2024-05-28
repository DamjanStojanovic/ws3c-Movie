import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style.css'
import {fetchData} from "../api/api";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await fetchData(`/movie/${id}`); // Use the fetchData function
            setMovie(data);
        };

        const fetchTrailer = async () => {
            const data = await fetchData(`/movie/${id}/videos?language=en-US`);
            const trailers = data.results.filter(result => result.site === 'YouTube' && result.type === 'Trailer');
            if (trailers.length > 0) {
                setTrailerKey(trailers[0].key);
            } else {
                console.error('No YouTube trailer found for the movie.');
            }
        };

        fetchMovie();
        fetchTrailer();
    }, [id]);

    useEffect(() => {
        if (trailerKey) {
            // Load the YouTube IFrame API script
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(script);

            const interval = setInterval(() => {
                if (window.YT) {
                    clearInterval(interval);
                    new window.YT.Player('trailer-container', {
                        height: '400',
                        width: '711',
                        videoId: trailerKey
                    });
                }
            }, 100);
        }
    }, [trailerKey]);

    if (!movie) return null;

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <p>{movie.vote_average} / 10</p>
            <p>{movie.release_date}</p>
            <div id="trailer-container"></div>
            {/* Add more movie details here */}
        </div>
    );
};

export default MovieDetail;