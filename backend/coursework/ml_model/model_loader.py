import torch
import os
from torchvision.models.resnet import ResNet
from albumentations.pytorch import ToTensorV2
import albumentations as A
import numpy as np

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "resnet_model.pth")
checkpoint = torch.load(MODEL_PATH, map_location="cpu", weights_only=False)
model = checkpoint["model"]
model.eval()

# Transform
transform = A.Compose([
    A.Resize(224, 224),
    A.CLAHE(clip_limit=2.0, tile_grid_size=(8, 8), p=1.0),
    A.Normalize(mean=[0.4815, 0.4815, 0.4815],
                std=[0.2235, 0.2235, 0.2235]),
    ToTensorV2(),
])

# GradCAM class and initialization
class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        target_layer.register_backward_hook(self.save_gradients)
        target_layer.register_forward_hook(self.save_activations)

    def save_gradients(self, module, grad_in, grad_out):
        self.gradients = grad_out[0]

    def save_activations(self, module, input, output):
        self.activations = output

    def generate(self, input_tensor, class_idx=None):
        output = self.model(input_tensor)

        if class_idx is None:
            class_idx = output.argmax(dim=1).item()

        self.model.zero_grad()
        output[0, class_idx].backward()

        gradients = self.gradients[0].mean(dim=(1, 2), keepdim=True)
        activations = self.activations[0]

        # Detach before converting to numpy
        cam = (gradients * activations).sum(dim=0).detach().cpu().numpy()
        cam = np.maximum(cam, 0)
        cam = cam / cam.max()

        return cam


gradcam = GradCAM(model, model.layer4[-1].conv2)
