import React, { useEffect, useState } from "react";
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("trafficData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const getGreenLightDirection = () => {
    if (!data) return null;

    for (const dir in data) {
      if (data[dir].ambulance) return dir;
    }

    return Object.entries(data).reduce((a, b) =>
      a[1].total > b[1].total ? a : b
    )[0];
  };

  const getTotalVehicles = () => {
    if (!data) return 0;
    return Object.values(data)
      .map((lane) => lane.total || 0)
      .reduce((a, b) => a + b, 0);
  };

  const greenDirection = getGreenLightDirection();
  const totalVehicles = getTotalVehicles();

  return (
    <div className="dashboard">
      <h1>Traffic Analysis Dashboard</h1>

      {data ? (
        totalVehicles === 0 ? (
          <h3 style={{ color: "gray", marginTop: "20px" }}>
            🚫 No vehicles detected in any direction
          </h3>
        ) : (
          <>
            <h3 style={{ color: "green", marginTop: "20px" }}>
              🚦 GREEN Light: {greenDirection.toUpperCase()} Direction
            </h3>

            <div className="intersection">
              {["east", "north", "south", "west"].map((dir) => (
                <div key={dir} className="card">
                  <h3>{dir.toUpperCase()} Direction</h3>
                  <p>{data[dir].total} Vehicles</p>
                  <p style={{ color: data[dir].ambulance ? "red" : "black" }}>
                    Status:{" "}
                    {data[dir].ambulance ? "Ambulance - Priority" : "Normal"}
                  </p>
                </div>
              ))}
            </div>

            <div className="card">
              <h3>Vehicle Classification</h3>
              {["ambulance", "bike", "bus", "car", "motorcycle", "truck"].map(
                (vehicle) => {
                  const total = Object.values(data)
                    .map((lane) => lane.counts[vehicle] || 0)
                    .reduce((a, b) => a + b, 0);
                  return (
                    <p key={vehicle}>
                      {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}:{" "}
                      {total}
                    </p>
                  );
                }
              )}
            </div>
          </>
        )
      ) : (
        <p>No data available. Please upload videos.</p>
      )}
    </div>
  );
}

export default Dashboard;
