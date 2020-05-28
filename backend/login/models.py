from django.db import models

# Create your models here.
class Account(models.Model):
    username = models.CharField(max_length=20)
    nickname = models.CharField(max_length=20)
    password = models.CharField(max_length=256)

class Session(models.Model):
    sessionID = models.CharField(max_length=256)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

