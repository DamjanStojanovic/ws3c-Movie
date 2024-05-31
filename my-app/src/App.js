import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './style.css'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
  );
}


export default App;