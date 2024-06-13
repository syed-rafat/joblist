from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser ,Job, SavedJob

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'user', 'user_type']
        read_only_fields = ['id', 'user', 'user_type']


class CandidateRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        custom_user = CustomUser.objects.create(user=user, user_type='CANDIDATE')
        return custom_user

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.user.username,
            'user_type': instance.user_type
        }
    

class CompanyRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        custom_user = CustomUser.objects.create(user=user, user_type='COMPANY')
        return custom_user

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.user.username,
            'email': instance.user.email,
            'user_type': instance.user_type
        }
 

    
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'company']


class SavedJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedJob
        fields = ['job', 'candidate']