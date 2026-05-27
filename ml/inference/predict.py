from pathlib import Path

import cv2


class RoadDamagePredictor:
    """Thin YOLOv8 inference adapter.

    Install ultralytics and provide YOLO_MODEL_PATH to enable real model loading.
    The API layer uses the same output shape whether this adapter is backed by a
    model or deterministic demo rules.
    """

    def __init__(self, model_path: str):
        self.model_path = Path(model_path)
        self.model = None
        if self.model_path.exists():
            from ultralytics import YOLO

            self.model = YOLO(str(self.model_path))

    def predict(self, image_path: str) -> list[dict]:
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image: {image_path}")
        if self.model is None:
            return [{"damage_type": "pothole", "confidence": 0.72, "bbox": [0, 0, image.shape[1], image.shape[0]]}]
        results = self.model.predict(image, conf=0.35)
        detections: list[dict] = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                detections.append(
                    {
                        "damage_type": result.names[class_id],
                        "confidence": float(box.conf[0]),
                        "bbox": [float(v) for v in box.xyxy[0]],
                    }
                )
        return detections
