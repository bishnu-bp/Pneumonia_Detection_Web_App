import os
import time
import json
import base64
import cv2
from PIL import Image
import numpy as np

from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view
from rest_framework.response import Response

import torch
from ml_model.inference import predict

COUNTER_FILE = os.path.join(settings.MEDIA_ROOT, "counters.json")
NORMAL_DIR = os.path.join(settings.MEDIA_ROOT, "NORMAL")
PNEUMONIA_DIR = os.path.join(settings.MEDIA_ROOT, "PNEUMONIA")

# Create file if it doesn't exist
if not os.path.exists(COUNTER_FILE):
    with open(COUNTER_FILE, "w") as f:
        json.dump({"temp1": 0, "temp2": 0}, f)


def load_counters():
    with open(COUNTER_FILE, "r") as f:
        return json.load(f)


def save_counters(data):
    with open(COUNTER_FILE, "w") as f:
        json.dump(data, f)


@api_view(['POST'])
def predict_image(request):
    if 'image' not in request.FILES:
        return Response({'error': 'No image uploaded'}, status=400)

    image = request.FILES['image']

    # Save temporary uploaded image
    file_path = default_storage.save("temp/" + image.name, image)
    full_path = os.path.join(settings.MEDIA_ROOT, file_path)

    # Predict
    label, confidence, heatmap_base64 = predict(full_path)

    # Load counters
    counters = load_counters()

    # Choose folder + increment counter
    if label == "NORMAL":
        save_dir = NORMAL_DIR
        counters["temp1"] += 1
        count = counters["temp1"]
    else:
        save_dir = PNEUMONIA_DIR
        counters["temp2"] += 1
        count = counters["temp2"]

    # Save updated counters
    save_counters(counters)

    # Make sure folder exists
    os.makedirs(save_dir, exist_ok=True)

    # Save filename with increment (temp1 or temp2)
    filename = f"{label}_{count}.jpg"
    save_path = os.path.join(save_dir, filename)

    # Save the uploaded file to the class folder
    with open(full_path, "rb") as src, open(save_path, "wb") as dst:
        dst.write(src.read())

    return Response({
        "prediction": label,
        "confidence": confidence,
        "gradcam_image": heatmap_base64,
        "saved_to": save_path,
        "temp1": counters["temp1"],
        "temp2": counters["temp2"]
    })
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email
        })
