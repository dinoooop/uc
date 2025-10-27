# core/utils/image_utils.py
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from rest_framework.response import Response
from rest_framework import status

def process_cropped_image(request, image_field_name: str = "image"):
    """
    Generic helper for cropping images uploaded from frontend.

    Parameters:
      - request: Django request (containing FILES and data)
      - image_field_name: name of the uploaded image field

    Expected request.data:
      - <image_field_name>_x, _y, _w, _h (percent-based crop values)

    Returns:
      - ContentFile of cropped image if successful
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

        img = Image.open(image_file)
        img = img.convert("RGB")

        crop_x = int((x / 100) * img.width)
        crop_y = int((y / 100) * img.height)
        crop_w = int((w / 100) * img.width)
        crop_h = int((h / 100) * img.height)

        box = (crop_x, crop_y, crop_x + crop_w, crop_y + crop_h)
        cropped_img = img.crop(box)

        buffer = BytesIO()
        cropped_img.save(buffer, format="JPEG", quality=90)

        file_name = f"cropped_{image_file.name}"
        return ContentFile(buffer.getvalue(), file_name)

    except Exception as e:
        return Response(
            {"error": f"Image processing failed: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
