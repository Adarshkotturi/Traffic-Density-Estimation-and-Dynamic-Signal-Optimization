import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🚦 Traffic Congestion Management System</h1>
        <p>
          A system that dynamically controls traffic signals based on real-time vehicle density and emergency vehicle detection.
        </p>
      </header>

      <section className="home-content">
        <h2>🔍 Key Features</h2>
        <ul>
          <li>📹 Video-based Traffic Analysis: Upload road footage for analysis.</li>
          <li>🚗 Vehicle Count per Lane: Detects and counts vehicles in each lane.</li>
          <li>🚑 Ambulance Detection: Prioritizes lanes with emergency vehicles.</li>
          <li>🚦 Smart Traffic Signal Control: Assigns green signals dynamically.</li>
          <li>📊 Real-time Dashboard: Visual representation of traffic status.</li>
        </ul>
      </section>

      <section className="home-instructions">
        <h2>🛠 How It Works</h2>
        <p>Follow these simple steps:</p>
        <ol>
          <li>📤 Upload a video of a four-lane road.</li>
          <li>🧠 YOLO Model detects vehicles and ambulances.</li>
          <li>🔢 Traffic density is analyzed per lane.</li>
          <li>🚥 Signal is assigned dynamically based on conditions.</li>
          <li>📊 Results are displayed on the dashboard.</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
