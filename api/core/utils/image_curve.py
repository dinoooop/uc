from datetime import datetime
import os
import random
from PIL import Image
from io import BytesIO
from django.conf import settings
from django.core.files.base import ContentFile
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from bootstrap.shsm.Imgo import img_resizes



def img_save_crop(request, image_field_name: str = "image"):
    """
    Generic helper for cropping images uploaded from frontend.

    Parameters:
      - request: Django request (containing FILES and data)
      - image_field_name: name of the uploaded image field

    Expected request.data:
      - <image_field_name>_x, _y, _w, _h (percent-based crop values)

    Returns:
      - cropped image filename
      - None if no image provided
      - Response (400) if failed
    """
    image_file = request.FILES.get(image_field_name)
    if not image_file:
        return None

    try:
        data = request.data
        x = float(data.get(f"{image_field_name}_x", 0))
        y = float(data.get(f"{image_field_name}_y", 0))
        w = float(data.get(f"{image_field_name}_w", 100))
        h = float(data.get(f"{image_field_name}_h", 100))

        
        with Image.open(image_file) as img:
            img = img.convert("RGB")

            crop_x = int((x / 100) * img.width)
            crop_y = int((y / 100) * img.height)
            crop_w = int((w / 100) * img.width)
            crop_h = int((h / 100) * img.height)

            box = (crop_x, crop_y, crop_x + crop_w, crop_y + crop_h)
            cropped_img = img.crop(box)

            buffer = BytesIO()
            cropped_img.save(buffer, format="JPEG", quality=90)
            buffer.seek(0)
            
            now = datetime.now()
            random_number = random.randint(1000, 9999)
            ext = image_file.name.split('.')[-1].lower()
            file_name = (
                f"{now.year}{now.month:02d}{now.day:02d}_"
                f"{now.hour:02d}{now.minute:02d}{now.second:02d}_{random_number}.{ext}"
            )

            processed_image = ContentFile(buffer.getvalue(), file_name)
            default_storage.save(f"uploads/{file_name}", processed_image)
            return file_name
        return None

    except Exception as e:
        return Response(
            {"error": f"Image processing failed: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
        
def img_resize(filename, type):
    filepath = os.path.join(settings.MEDIA_ROOT, "uploads", filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        return False
    with Image.open(filepath) as img:
        img = img.convert("RGB")    
        # Loop through resize instructions
        resizes = img_resizes.get(type, [])
        for r in resizes:
            name = r.get("name")
            width = int(r.get("width", 0))
            height = int(r.get("height", 0))

            if not name or width <= 0 or height <= 0:
                continue  # skip invalid entries

            resized_img = img.resize((width, height), Image.Resampling.LANCZOS)

            # Build safe output path
            new_filename = os.path.join(settings.MEDIA_ROOT, "uploads", f"{name}-{filename}")

            # Save resized image
            resized_img.save(new_filename, format="JPEG", quality=90)
            print(f"Created resized image: {new_filename}")

    return True