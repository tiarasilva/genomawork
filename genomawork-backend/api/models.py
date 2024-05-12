from django.db import models

class FoodReviews(models.Model):
  name = models.CharField(max_length=200)
  location = models.CharField(max_length=200)
  type = models.IntegerField()
  rank = models.IntegerField(null=True)
  country = models.CharField(max_length=200)
  visited = models.BooleanField(default=False) 
  updatedAt = models.DateTimeField(auto_now=True)
  createdAt = models.DateTimeField(auto_now_add=True)

class TypeRestaurants(models.Model):
  name = models.CharField(max_length=200)
  updatedAt = models.DateTimeField(auto_now=True)
  createdAt = models.DateTimeField(auto_now_add=True)