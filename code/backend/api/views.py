from django.shortcuts import render
import json
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
import argon2
from .models import Recipients, MailTemplate, User, Campaign
from .serializers import RecipientsSerailizer, MailSerailizer, UserSerializer, CampaignSerializer

@api_view(['GET'])
def getData(request):
    person = {'name': 'Abylin', 'age': 20}
    return Response(person)


@api_view(['GET'])
def campaign(request):
    if(request.method=='GET'):
        campaign = Campaign.objects.all()
        serializer = CampaignSerializer(campaign, many=True)
        return Response(serializer.data)
    if(request.method=="POST"):
        data = request.data
        serializer = CampaignSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"error":'Failed Creating campaign'})


@api_view(['GET','POST','PATCH'])
def recipient(request):
    if(request.method == 'GET'):
        recipients = Recipients.objects.all()
        serializer = RecipientsSerailizer(recipients, many=True)
        return Response(serializer.data)

    if(request.method == 'POST'):
        data = request.data
        serializer = RecipientsSerailizer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"error":"Failed to Add Recipient"})

# Regsiter User
@api_view(['POST'])
def RegisterView(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def LoginView(request):
    email = request.data['email']
    password = bytes(request.data['password'], 'utf-8')
    hashed_password = argon2.hash_password(password)
    hashed_password = hashed_password.decode("utf-8")
    print(hashed_password)
    user = User.objects.filter(email=email).first()
    print(user.password)
    if user is None:
        raise AuthenticationFailed('User not found')
    if hashed_password != user.password:
        raise AuthenticationFailed('Incorrect Password')
    return Response(user)
