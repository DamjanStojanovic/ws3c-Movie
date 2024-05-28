import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NewPage from './NewPage'; // Pfad zu Ihrer NewPage Komponente
import logo from './logo.svg'; // adjust the path to match the actual location of your logo file

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Link to="/new-page">
              <button>
                Öffne neue Seite
              </button>
            </Link>
          </header>
          <Routes>
            <Route path="/new-page" element={<NewPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;