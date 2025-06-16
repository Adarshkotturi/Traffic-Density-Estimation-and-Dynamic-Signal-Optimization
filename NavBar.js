import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>A YOLO Based Traffic Density Estimation and Dynamic Signal Optimization</h1>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/upload">Upload Video</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  </nav>
);

export default Navbar;
