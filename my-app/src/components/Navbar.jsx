import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Search from "./Search";

const Navbar = () => {
  const [movies, setMovies] = useState([]);

  return (
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Home</Link>
        <Search setMovies={setMovies}/>
      </nav>
  );
};

export default Navbar;
