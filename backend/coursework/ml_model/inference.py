import base64
import cv2
from PIL import Image
import numpy as np
import torch
import os
from ml_model.model_loader import model, gradcam, transform

def predict(image_path):
    if not os.path.exists(image_path):
        raise ValueError("Image path does not exist.")

    img = Image.open(image_path).convert("RGB")
    img_np = np.array(img)

    augmented = transform(image=img_np)
    input_tensor = augmented["image"].unsqueeze(0)

    with torch.no_grad():
        output = model(input_tensor)
        prob = torch.softmax(output, dim=1)[0]

    confidence = float(prob.max() * 100)
    pred_class = int(prob.argmax())
    label = "PNEUMONIA" if pred_class == 1 else "NORMAL"

    cam = gradcam.generate(input_tensor, class_idx=pred_class)
    cam = cv2.resize(cam, (img_np.shape[1], img_np.shape[0]))
    heatmap = cv2.applyColorMap((cam * 255).astype("uint8"), cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(img_np, 0.5, heatmap, 0.5, 0)

    _, buffer = cv2.imencode(".jpg", overlay)
    heatmap_base64 = base64.b64encode(buffer).decode("utf-8")

    return label, round(confidence, 2), heatmap_base64
