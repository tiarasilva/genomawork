from .models import FoodReviews, TypeRestaurants
from rest_framework import serializers

class FoodReviewsSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = FoodReviews
    fields = '__all__'

class TypeRestaurantsSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = TypeRestaurants
    fields = '__all__'