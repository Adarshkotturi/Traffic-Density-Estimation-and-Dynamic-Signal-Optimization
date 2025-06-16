import React, { useState } from "react";
import "./SignalControl.css";

const SignalControl = () => {
  const [trafficData, setTrafficData] = useState({
    lane1: { count: 5, ambulance: false },
    lane2: { count: 10, ambulance: false },
    lane3: { count: 2, ambulance: true },  // Example: Ambulance detected in lane 3
    lane4: { count: 7, ambulance: false },
  });

  const determineGreenSignal = () => {
    // Check for ambulance first
    for (const lane in trafficData) {
      if (trafficData[lane].ambulance) {
        return lane;
      }
    }

    // If no ambulance, find lane with max vehicles
    return Object.keys(trafficData).reduce((a, b) =>
      trafficData[a].count > trafficData[b].count ? a : b
    );
  };

  const greenLane = determineGreenSignal();

  return (
    <div className="signal-container">
      <h2>Traffic Signal Control</h2>
      <div className="signals">
        {Object.keys(trafficData).map((lane) => (
          <div key={lane} className="lane">
            <span>{lane.toUpperCase()}</span>
            <div className={`light ${greenLane === lane ? "green" : "red"}`}></div>
          </div>
        ))}
      </div>
      <p>🚦 Green signal for: <strong>{greenLane.toUpperCase()}</strong></p>
    </div>
  );
};

export default SignalControl;
