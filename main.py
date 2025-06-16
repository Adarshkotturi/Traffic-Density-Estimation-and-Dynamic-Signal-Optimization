from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from detector import analyze_multiple_videos

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_videos():
    directions = ['north', 'east', 'south', 'west']
    video_paths = {}

    for dir in directions:
        if dir not in request.files:
            return jsonify({"error": f"No video provided for direction: {dir}"}), 400

        file = request.files[dir]
        path = os.path.join(UPLOAD_FOLDER, f"{dir}.mp4")
        file.save(path)
        video_paths[dir] = path

    result = analyze_multiple_videos(video_paths)
    return jsonify(result)

@app.route("/", methods=["GET"])
def index():
    return "Flask backend is running!"

if __name__ == "__main__":
    app.run(debug=True)
