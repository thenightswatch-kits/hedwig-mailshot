from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Recipients(models.Model):
    name = models.CharField(max_length=100, )
    email = models.CharField(max_length=200)
    dob = models.DateField()
    contact = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    group = models.CharField(max_length=100)

class MailTemplate(models.Model):
    title = models.CharField(max_length=100, )
    subject = models.CharField(max_length=200)
    content = models.CharField(max_length=800)
    attachment = models.FileField(upload_to ='uploads/')

class User(models.Model):
    name = models.CharField(max_length=100, )
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    permission = models.CharField(max_length=100)

class Campaign(models.Model):
    title = models.CharField(max_length=25)
    group = models.CharField(max_length=15)
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField(auto_now_add=True)
    total_mail = models.IntegerField()
    sent_mail = models.IntegerField()
    type = models.CharField(max_length=20, default="immediate")
    status = models.CharField(max_length=20)
    mail_id = models.IntegerField()


