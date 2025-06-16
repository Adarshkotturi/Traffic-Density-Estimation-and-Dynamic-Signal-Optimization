import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadVideos from "./components/UploadVideo";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import './components/WebStyles.css';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadVideos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
