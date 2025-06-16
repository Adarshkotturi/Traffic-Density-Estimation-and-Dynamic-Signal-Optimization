import React, { useState } from 'react';
import axios from 'axios';
import './UploadVideo.css';
function UploadVideos() {
  const [files, setFiles] = useState({});
  const directions = ['north', 'east', 'south', 'west'];

  const handleFileChange = (e, dir) => {
    setFiles(prev => ({ ...prev, [dir]: e.target.files[0] }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    directions.forEach(dir => {
      if (files[dir]) {
        formData.append(dir, files[dir]);
      }
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      localStorage.setItem("trafficData", JSON.stringify(response.data));
      alert("Videos uploaded and processed successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    }
  };

  return (
  <div className="upload-container">
    <h2>Upload Traffic Videos from Four Directions</h2>
    {directions.map(dir => (
      <div key={dir} className="upload-group">
        <label>{dir.toUpperCase()} Video:</label>
        <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, dir)} />
      </div>
    ))}
    <button onClick={handleUpload}>Upload & Analyze</button>
  </div>
);
}

export default UploadVideos;