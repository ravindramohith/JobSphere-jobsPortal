from . import views
from django.urls import path

urlpatterns = [
    path("jobs/", views.getAllJobs, name="jobs"),
    path("createjob", views.createJob, name="createjob"),
    path("job/<int:pk>", views.getJob, name="job-details"),
    path("job/<int:pk>/update", views.updateJob, name="job-update"),
    path("job/<int:pk>/delete", views.deleteJob, name="job-delete"),
    path("stats/<str:topic>", views.getStats, name="get_topic_stats"),
    path("jobs/<str:pk>/apply", views.applyToJob, name="applytojob"),
    path(
        "getCurrentUserAppliedJobs/",
        views.getUserAppliedJobs,
        name="get_user_applied_jobs",
    ),
    path(
        "getCurrentUserJobs/",
        views.getUserJobs,
        name="get_user_jobs",
    ),
    path("jobs/<str:pk>/check", views.checkApplication, name="check_application"),
    path("jobs/<str:pk>/getUsers", views.UsersApplied, name="get_users"),
]
