from rest_framework import serializers
from .models import User, Campaign, MailTemplate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'permission']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"
        db_table = "campaign"

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MailTemplate
        fields = "__all__"
        db_table = "mail_template"