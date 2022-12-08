from datetime import *
from django.db import models
import geocoder, os
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point


def ReturnDateTime():
    now = datetime.now()
    return now + timedelta(days=10)


class JobType(models.TextChoices):
    Permanent = "Permanent"
    Internship = "Internship"
    Temporary = "Temporary"


class Education(models.TextChoices):
    Bachelors = "Bachelors"
    Masters = "Masters"
    Phd = "Phd"


class Industry(models.TextChoices):
    IT = "IT"
    Business = "Business"
    Banking = "Banking"
    Education = "Education"
    Telecommunication = "Telecommunication"
    Others = "Others"


class Experience(models.TextChoices):
    No_Experience = "No Experience"
    one_year = "1 years"
    two_years = "2 years"
    Three_years_above = "3 years plus"


class Job(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=100, null=True)
    jobType = models.CharField(
        max_length=10, choices=JobType.choices, default=JobType.Permanent
    )
    education = models.CharField(
        max_length=10, choices=Education.choices, default=Education.Bachelors
    )
    industry = models.CharField(
        max_length=30, choices=Industry.choices, default=Industry.Business
    )
    experience = models.CharField(
        max_length=20, choices=Experience.choices, default=Experience.No_Experience
    )
    salary = models.IntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000000)]
    )
    position = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True)
    point = gismodels.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateTimeField(default=ReturnDateTime)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        coordinates = geocoder.mapquest(
            self.address, key=os.environ.get("GEOCODER_API")
        )
        lng = coordinates.lng
        lat = coordinates.lat
        print(coordinates)
        self.point = Point(lng, lat)
        super(Job, self).save(*args, **kwargs)


class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    resume = models.CharField(max_length=200)
    appliedAt = models.DateTimeField(auto_now_add=True)
