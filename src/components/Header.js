import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">
            BSMCSM<span>2024</span>
          </Link>
        </h1>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
            <li><Link to="/events" className={location.pathname === "/events" ? "active" : ""}>Events</Link></li>
            <li><Link to="/leaderboard" className={location.pathname === "/leaderboard" ? "active" : ""}>Leaderboard</Link></li>
            <li><Link to="/schedule" className={location.pathname === "/schedule" ? "active" : ""}>Schedule</Link></li>
            <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;