from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.SignUp, name="registration"),
    path("get/me/", views.getCurrentUser, name="getme"),
    path("update/me/", views.updateCurrentUser, name="updateme"),
    path("upload/resume/", views.uploadResume, name="uploadresume"),
]
