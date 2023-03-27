from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    permission = models.CharField(max_length=255, default="")
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Recipients(models.Model):
    name = models.CharField(max_length=100, )
    email = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    taluk = models.CharField(max_length=200)
    failed = models.IntegerField()
    dob = models.DateField()
    contact = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

class MailTemplate(models.Model):
    title = models.CharField(max_length=100, )
    subject = models.CharField(max_length=225)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=1000)
    user_id = models.IntegerField()

class Campaign(models.Model):
    title = models.CharField(max_length=25)
    user_id = models.IntegerField()
    template_id = models.IntegerField()
    type = models.CharField(max_length=15)
    schedule_at = models.DateTimeField(null=True, default='2000-01-01T01:01')
    started_at = models.DateTimeField(null=True, default='2000-01-01T01:01')
    ended_at = models.DateTimeField(null=True, default='2000-01-01T01:01')
    total_mail = models.IntegerField(default=0)
    failed_mail = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="pending")

class TemplateMultimedia(models.Model):
    template_id = models.IntegerField()
    media = models.FileField(upload_to ='uploads/multimedia/')

class CampaignAttachment(models.Model):
    campaign_id = models.IntegerField()
    attachment = models.FileField(upload_to ='uploads/attachments/')