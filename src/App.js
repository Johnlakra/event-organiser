import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Leaderboard from './pages/Leaderboard';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Admin from './pages/Admin/Admin'; // Update this import
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;