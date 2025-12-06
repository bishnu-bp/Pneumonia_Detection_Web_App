from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.conf import settings
import os
from ml_model.inference import predict

@api_view(['POST'])
def predict_image(request):
    if 'image' not in request.FILES:
        return Response({'error': 'No image uploaded'}, status=400)

    image = request.FILES['image']
    file_path = default_storage.save("temp.jpg", image)
    full_path = os.path.join(settings.MEDIA_ROOT, file_path)

    result = predict(full_path)

    return Response({"prediction": result})
