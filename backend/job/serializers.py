from rest_framework import serializers
from .models import Job, Application


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = Application
        fields = ("user", "resume", "appliedAt", "job")
