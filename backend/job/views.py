from django.shortcuts import get_object_or_404
from django.db.models import Avg, Min, Max, Count
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .models import Job, Application
from .filters import JobFilter
from .serializers import JobSerializer, ApplicationSerializer


@api_view(["GET"])
def getAllJobs(request):
    # jobs = Job.objects.all()

    # filtering:
    filterset = JobFilter(request.GET, queryset=Job.objects.all().order_by("id"))
    total = filterset.qs.count()

    # pagination:
    resultsPerPage = 3
    paginator = PageNumberPagination()
    paginator.page_size = resultsPerPage
    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response(
        {
            "totalResults": total,
            "resultsPerPage": resultsPerPage,
            "jobs": serializer.data,
        }
    )


@api_view(["GET"])
def getJob(request, pk):
    job = get_object_or_404(Job, id=pk)
    candidates = job.application_set.all().count()
    serializer = JobSerializer(job, many=False)
    return Response({"job": serializer.data, "candidates": candidates})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createJob(request):
    request.data["user"] = request.user
    data = request.data
    job = Job.objects.create(**data)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response(
            {"message": "You cannot update other's Job"},
            status=status.HTTP_403_FORBIDDEN,
        )

    job.title = request.data["title"]
    job.description = request.data["description"]
    job.email = request.data["email"]
    job.address = request.data["address"]
    job.jobType = request.data["jobType"]
    job.education = request.data["education"]
    job.industry = request.data["industry"]
    job.experience = request.data["experience"]
    job.salary = request.data["salary"]
    job.position = request.data["position"]
    job.company = request.data["company"]

    job.save()

    serializer = JobSerializer(job, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response(
            {"message": "You cannot Delete other's Job"},
            status=status.HTTP_403_FORBIDDEN,
        )
    job.delete()
    return Response(
        {"detail": "Job is deleted Successfully"}, status=status.HTTP_204_NO_CONTENT
    )


@api_view(["GET"])
def getStats(request, topic):
    args = {"title__icontains": topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({"message": "Stats not found for {topic}".format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count("title"),
        avg_positions=Avg("position"),
        avg_salary=Avg("salary"),
        min_salary=Min("salary"),
        max_salary=Max("salary"),
    )
    return Response(stats)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def applyToJob(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume == "":
        return Response(
            {"message": "Please Upload Your Resume First."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if job.lastDate < timezone.now():
        return Response(
            {"message": "Sorry the job was expired."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    alreadyApplied = job.application_set.filter(user=user).exists()

    if alreadyApplied:
        return Response(
            {"message": "You have already applied to this Job."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    jobApplied = Application.objects.create(
        job=job, user=user, resume=user.userprofile.resume
    )

    return Response(
        {"applied": True, "job_id": jobApplied.id}, status=status.HTTP_200_OK
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserAppliedJobs(request):
    args = {"user_id": request.user.id}
    jobs = Application.objects.filter(**args)
    serializer = ApplicationSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def checkApplication(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)
    return Response(job.application_set.filter(user=user).exists())


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserJobs(request):
    args = {"user": request.user.id}
    jobs = Job.objects.filter(**args)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UsersApplied(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)
    if job.user != user:
        return Response(
            {"message": "You are not allowed to access this job"},
            status=status.HTTP_403_FORBIDDEN,
        )
    args = {"job_id": request.user.id}
    users = job.application_set.all()
    serialilizer = ApplicationSerializer(users, many=True)
    return Response({"data":serialilizer.data,"name":job.title})
