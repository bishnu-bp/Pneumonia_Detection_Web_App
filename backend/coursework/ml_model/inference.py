import os
import torch
import numpy as np
from PIL import Image
import albumentations as A
from albumentations.pytorch import ToTensorV2
from torchvision.models.resnet import ResNet


torch.serialization.add_safe_globals([ResNet])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml_model", "resnet_model.pth")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"MODEL NOT FOUND! Expected at: {MODEL_PATH}")


checkpoint = torch.load(MODEL_PATH, map_location="cpu", weights_only=False)
model = checkpoint["model"]
model.eval()


transform = A.Compose([
    A.Resize(224, 224),
    A.CLAHE(clip_limit=2.0, tile_grid_size=(8, 8), p=1.0),
    A.Normalize(mean=[0.4815, 0.4815, 0.4815],
                std=[0.2235, 0.2235, 0.2235]),
    ToTensorV2(),
])

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
    return label, round(confidence, 2)
