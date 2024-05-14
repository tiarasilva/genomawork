from .models import FoodReviews
from .serializers import FoodReviewsSerializer
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

class FoodReviewsViewSet(viewsets.ModelViewSet):
  queryset = FoodReviews.objects.all()
  serializer_class = FoodReviewsSerializer
  filter_backends = [filters.SearchFilter, DjangoFilterBackend]
  search_fields = ['name', 'location', 'country', 'typeFood', 'rank', 'visited']
  filterset_fields = ['name', 'location', 'country', 'typeFood', 'rank', 'visited']

  # POST
  def create(self, request, *args, **kwargs):
    print("Creando un nuevo local de comida")
    return super().create(request, *args, **kwargs)
  
  def update(self, request, *args, **kwargs):
    print("Actualizando un local de comida")
    return super().update(request, *args, **kwargs)
  
  def delete(self, request, *args, **kwargs):
    print("Eliminando un local de comida")
    return super().delete(request, *args, **kwargs)


