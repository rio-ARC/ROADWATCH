# Training Notes

Recommended path:

1. Export a Roboflow road-damage dataset in YOLOv8 format.
2. Train with `ultralytics` using classes: pothole, crack, erosion, debris, flooding.
3. Save the best model at `ml/inference/models/roadwatch-yolov8.pt`.
4. Track model version and confidence thresholds in backend analysis records.

Critical system logic such as authority routing and SLA assignment remains outside the ML model.
