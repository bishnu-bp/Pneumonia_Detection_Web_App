import torch
from torchvision import transforms, models
from PIL import Image
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ml_model/resnet_model.pth")


model = models.resnet18(pretrained=False)
model.fc = torch.nn.Linear(model.fc.in_features, 2) 

state_dict = torch.load(MODEL_PATH, map_location="cpu")
model.load_state_dict(state_dict)


model.eval()


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict(image_path):
    img = Image.open(image_path).convert("RGB")
    img_tensor = transform(img).unsqueeze(0)

    with torch.no_grad():
        output = model(img_tensor)
        _, predicted = torch.max(output, 1)

    return int(predicted.item())