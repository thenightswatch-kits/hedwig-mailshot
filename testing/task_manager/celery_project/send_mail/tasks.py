#from django.contrib.auth import get_user_model
from celery import shared_task,Celery
from django.core.mail import send_mail
from celery_project import settings
#import asyncio

celery = Celery('tasks', broker='redis://127.0.0.1:6379')

@shared_task(bind=True)
def send(self):
   
    mail_subject= "Testing.."
    msg = "Greetings..Gladin\nThis mail is under testing......."
    
    send_mail(
           subject=mail_subject,
           message= msg,
           from_email= settings.EMAIL_HOST_USER,
           recipient_list=['issacgladin@gmail.com','issacgladin@karunya.edu.in'],
           fail_silently = False,
        )
    return "Done"