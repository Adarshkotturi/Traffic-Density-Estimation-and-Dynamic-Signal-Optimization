
import cv2
from ultralytics import YOLO
import torch# Load model with verbose logging off
model = YOLO("C:\\Users\\KANNA\\miniproject\\traffic-management\\runs\\detect\\train9\\weights\\best.pt", verbose=False)
#Automatically choose GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"

def analyze_multiple_videos(video_paths):
    summary = {}
    vehicle_classes = ["car", "truck", "motorcycle", "ambulance", "bus", "bike"]

    for direction, path in video_paths.items():
        cap = cv2.VideoCapture(path)
        lane_vehicles = {cls: 0 for cls in vehicle_classes}
        has_ambulance = False

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Resize for faster inference
            frame = cv2.resize(frame, (416, 416))

            # YOLOv8 detection
            results = model(frame, device=device)[0]

            for box in results.boxes.data:
                cls_id = int(box[-1].item())
                cls_name = model.names[cls_id]
                if cls_name in lane_vehicles:
                    lane_vehicles[cls_name] += 1
                    if cls_name == "ambulance":
                        has_ambulance = True

            break  # Only process 1 frame for speed
        cap.release()

        summary[direction] = {
            "counts": lane_vehicles,
            "total": sum(lane_vehicles.values()),
            "ambulance": has_ambulance
        }

    return summary
