from django.db import models
from login.models import Account
from .validators import validate_image, validate_image_size
import random
from .storage import OverwriteStorage


# Create your models here.
class AccountInfo(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatar/', validators=[validate_image, validate_image_size],
                               default='default/' + str(random.randint(1, 54)) + '.png', storage=OverwriteStorage())
    level = models.IntegerField(default=1)
    coin = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    BMI = models.IntegerField(default=0)
