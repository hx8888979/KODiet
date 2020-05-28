from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError


def validate_image(img):
    return FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'gif', 'png'])(img)


def validate_image_size(img):
    if img.size > 1048576:
        raise ValidationError(message='Image size should be less than 1MB')
