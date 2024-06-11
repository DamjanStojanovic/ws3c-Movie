import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = Cookies.get('watchlist') ? JSON.parse(Cookies.get('watchlist')) : [];
        console.log('Retrieved watchlist:', savedWatchlist);
        setWatchlist(savedWatchlist);
    }, []);

    return (
        <div className="watchlist-container">
            {console.log('Rendering Watchlist component')}
            <h1>My Watchlist</h1>
            {watchlist.length > 0 ? (
                <div className="watchlist-movies">
                    {watchlist.map(movie => (
                        <div key={movie.id} className="watchlist-movie">
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </Link>
                            <div className="movie-info">
                                <h2>{movie.title}</h2>
                                <p>{new Date(movie.release_date).getFullYear()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your watchlist is empty.</p>
            )}
        </div>
    );
};

export default Watchlist;
