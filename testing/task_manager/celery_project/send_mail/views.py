from django.shortcuts import render
from send_mail.tasks import send
from django.http.response import HttpResponse
#import asyncio
# Create your views here.

def send_mail_to_all(request):
    send()
    return HttpResponse("sent")