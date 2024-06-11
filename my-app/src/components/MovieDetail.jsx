import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchData } from '../api/api';
import watchlist from "./Watchlist";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const watchlist = Cookies.get('watchlist') ? JSON.parse(Cookies.get('watchlist')) : [];



    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await fetchData(`/movie/${id}?language=en-US&append_to_response=videos`);
                setMovie(data);

                const imageData = await fetchData(`/movie/${id}/images?language=en`);

                if (imageData.backdrops && imageData.backdrops.length > 0) {
                    setBackgroundImage(imageData.backdrops[0].file_path);
                }

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

        setIsInWatchlist(!!watchlist.find(item => item.id === parseInt(id)));
    }, [id]);

    const addToWatchlist = () => {
        const watchlist = Cookies.get('watchlist') ? JSON.parse(Cookies.get('watchlist')) : [];
        watchlist.push({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date
        });
        Cookies.set('watchlist', JSON.stringify(watchlist), {expires: 365});
        setIsInWatchlist(true);
    };

    const removeFromWatchlist = () => {
        const watchlist = Cookies.get('watchlist') ? JSON.parse(Cookies.get('watchlist')) : [];
        const updatedWatchlist = watchlist.filter(item => item.id !== movie.id);
        Cookies.set('watchlist', JSON.stringify(updatedWatchlist), { expires: 365 });
        setIsInWatchlist(false);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-header"
                 style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${backgroundImage})` }}
            >
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
                    { isInWatchlist ? (
                        <button className="watchlist-button" onClick={removeFromWatchlist}>Remove from Watchlist</button>
                    ) : (
                        <button className="watchlist-button" onClick={addToWatchlist}>Add to Watchlist</button>
                    )}
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
