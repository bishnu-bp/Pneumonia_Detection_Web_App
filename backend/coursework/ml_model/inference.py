import torch
from torchvision import transforms
from PIL import Image
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ml_model/resnet_model.pth")

model = torch.load(MODEL_PATH, map_location="cpu")
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict(image_path):
    img = Image.open(image_path).convert("RGB")
    img_t = transform(img).unsqueeze(0)

    with torch.no_grad():
        out = model(img_t)
        _, pred = torch.max(out, 1)

    return int(pred.item())
