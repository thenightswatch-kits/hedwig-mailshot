from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, CampaignSerializer, TemplateSerializer, RecipientSerializer
from .models import User, Campaign, MailTemplate, Recipients
import jwt, datetime
from .util import *

SECRET = '2egfi2h9urawdjfn'

# Authentication Views

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=240),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, SECRET, algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        print("***")
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


# CampaignView
class CampaignView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        print(user.permission)
        serializer = UserSerializer(user)
        if(user.permission == 'admin'):
            campaign = Campaign.objects.all()
            campaign_serializer = CampaignSerializer(campaign, many=True)
            return Response(campaign_serializer.data)
        elif(user.permission != 'admin'):
            campaign = Campaign.objects.filter(user_id=user.id)
            campaign_serializer = CampaignSerializer(campaign, many=True)
            return Response(campaign_serializer.data)
        return Response(serializer.data)
    
    def post(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        data = request.data
        data['user_id'] = user.id
        if(request.data['type'] == 'immediate'):
            data['schedule_at'] = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
            data['started_at'] = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        serializer = CampaignSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    


#Group View
class GroupView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        print(user.permission)
        serializer = UserSerializer(user)
        if(user.permission == 'admin'):
            group = User.objects.all()
            group_serializer = UserSerializer(group, many=True)
            return Response(group_serializer.data)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class TemplateView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        print(user.permission)
        template = MailTemplate.objects.filter(user_id=user.id)
        template_serializer = TemplateSerializer(template, many=True)
        return Response(template_serializer.data)
    
    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        print(request.data)
        user = User.objects.filter(id=payload['id']).first()
        data = request.data
        data['user_id'] = user.id
        serializer = TemplateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ApproveView(APIView):
    def post(self, request):
        print(request.data)
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        print(user.permission)
        serializer = UserSerializer(user)
        if(user.permission == 'admin'):
            data = request.data
            campaign = Campaign.objects.filter(id=data['id'])
            campaign.update(status=data['status'])
            if(data['status']=='immediate'):
                send_mail(data['id'])
            return Response ("Updated")
        

class RecipientView(APIView):
    def get(self, request):
        print(request.data)
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        print(user.permission)
        serializer = UserSerializer(user)
        if(user.permission == 'admin'):
            group = Recipients.objects.all()
            group_serializer = RecipientSerializer(group, many=True)
            return Response(group_serializer.data)
        return Response(serializer.data)
    def post(self, request):
        print(request.data)
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        print(user.permission)
        serializer = UserSerializer(user)
        if(user.permission == 'admin'):
            recipient = RecipientSerializer(data=request.data)
            recipient.is_valid(raise_exception=True)
            recipient.save()
            return Response(recipient.data)

# class EchoView(APIView):
    # def post(self, request):
    #     for i in request.data:
    #         name = i["name"]
    #         subject = i["subject"]
    #         message = i["message"]
    #         message = message.replace("{%name%}",name)
    #         subject = subject.replace("{%name%}",name)
    #         reciever = i["reciever"]
    #         os.system(f'echo -e "Subject:{subject} \n\n {message}\n" | sendmail {reciever}')
    #     return Response("Successful")