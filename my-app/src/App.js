import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './style.css'
import Home from "./components/Home";

function App() {
  return (
      <Router>
        <Home />
      </Router>
  );
}


export default App;