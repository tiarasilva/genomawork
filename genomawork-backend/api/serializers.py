from .models import FoodReviews
from rest_framework import serializers

class FoodReviewsSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = FoodReviews
    fields = ["id", "name", "location", "typeFood", "rank", "country", "visited"]
