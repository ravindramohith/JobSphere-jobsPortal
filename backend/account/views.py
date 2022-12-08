from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, SignUpSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .validators import validate_file_extension


@api_view(["POST"])
def SignUp(request, *args, **kwargs):
    data = request.data
    user = SignUpSerializer(data=request.data)

    if user.is_valid():
        if not User.objects.filter(username=data["email"]).exists():
            user = User.objects.create(
                first_name=data["first_name"],
                last_name=data["last_name"],
                username=data["email"],
                email=data["email"],
                password=make_password(data["password"]),
            )

            return Response(
                {"message": "User signed up successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"message": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    else:
        return Response(user.errors)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCurrentUser(request):
    user = UserSerializer(request.user)
    return Response(user.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateCurrentUser(request):
    user = request.user
    data = request.data
    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.email = data["email"]
    user.username = data["email"]

    if data["password"] != "":
        user.password = make_password(data["password"])
    else:
        user.password = user.password
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def uploadResume(request):
    user = request.user
    resume = request.FILES["resume"]

    if resume == "":
        return Response(
            {"error": "Please upload your resume."}, status=status.HTTP_400_BAD_REQUEST
        )

    if not validate_file_extension(resume.name):
        return Response(
            {"error": "Please upload your resume in PDF format only."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serializer = UserSerializer(user, many=False)
    user.userprofile.resume = resume
    user.userprofile.save()
    return Response(serializer.data)
