import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Search from "./Search";

const Navbar = () => {
    const [setMovies] = useState([]);

    return (
        <nav className="navbar glassmorphism-effect">
            <Link to="/" className="navbar-brand">
                <img src={`${process.env.PUBLIC_URL}/MovieDB-Logo_mobile.png`} alt="MovieDB"
                     className="logo mobile-image"/>
                <img src={`${process.env.PUBLIC_URL}/MovieDB-Logo_desktop.png`} alt="MovieDB"
                     className="logo desktop-image"/>
            </Link>
            <Link to="/watchlist" className="navbar-brand">
                <img src={`${process.env.PUBLIC_URL}/watchlist_mobile.png`} alt="Watchlist"
                     className="watchlist-logo mobile-image"/>
                <img src={`${process.env.PUBLIC_URL}/watchlist_desktop.png`} alt="Watchlist"
                     className="watchlist-logo desktop-image"/>
            </Link>
            <Search setMovies={setMovies}/>
        </nav>
    );
};

export default Navbar;
