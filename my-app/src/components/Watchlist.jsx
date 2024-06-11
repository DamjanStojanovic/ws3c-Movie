import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import MovieCarousel from "./MovieCarousel";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const savedWatchlist = Cookies.get('watchlist') ? JSON.parse(Cookies.get('watchlist')) : [];
        console.log('Retrieved watchlist:', savedWatchlist);
        setWatchlist(savedWatchlist);
    }, []);

    return (
        <div className="watchlist-container">
            {watchlist.length > 0 ? (
                <MovieCarousel title="My Watchlist" movies={watchlist}/>
            ) : (
                <p>Your watchlist is empty.</p>
            )}
        </div>
    );
};

export default Watchlist;
