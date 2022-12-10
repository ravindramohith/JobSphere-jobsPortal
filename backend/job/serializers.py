from rest_framework import serializers
from .models import Job, Application
from django.contrib.auth.models import User


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email")


class ApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    salary = serializers.IntegerField(source="job.salary")

    class Meta:
        model = Application
        fields = ("user", "resume", "appliedAt", "salary")
