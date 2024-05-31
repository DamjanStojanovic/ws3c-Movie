import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api/api';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await fetchData(`/movie/${id}?language=en-US&append_to_response=videos`);
                setMovie(data);

                if (data.videos && data.videos.results) {
                    const trailer = data.videos.results.find(
                        (video) => video.type === 'Trailer' && video.site === 'YouTube'
                    );
                    setTrailer(trailer);
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-header">
                <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="movie-info">
                    <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
                    <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                    <div className="movie-rating">
                        <span>Rating: {movie.vote_average} / 10</span>
                    </div>
                    {/* TODO: Add watchlist functionality */}
                    <button className="watchlist-button">Add to Watchlist</button>
                    <h3>Movie Description</h3>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <div className="movie-trailer">
                <h3>Trailer</h3>
                {trailer ? (
                    <iframe
                        className="trailer-iframe"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="trailer-placeholder">
                        <span>No Trailer Available</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
