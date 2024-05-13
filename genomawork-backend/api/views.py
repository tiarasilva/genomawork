from .models import FoodReviews
from .serializers import FoodReviewsSerializer
from rest_framework import viewsets

class FoodReviewsViewSet(viewsets.ModelViewSet):
  queryset = FoodReviews.objects.all()
  serializer_class = FoodReviewsSerializer

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
    