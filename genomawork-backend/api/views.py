from .models import FoodReviews, TypeRestaurants
from .serializers import FoodReviewsSerializer, TypeRestaurantsSerializer
from rest_framework import viewsets

class FoodReviewsViewSet(viewsets.ModelViewSet):
    queryset = FoodReviews.objects.all()
    serializer_class = FoodReviewsSerializer

    # POST
    def create(self, request, *args, **kwargs):
        print("Creando un nuevo local de comida")
        return super().create(request, *args, **kwargs)

class TypeRestaurantsViewSet(viewsets.ModelViewSet):
    queryset = TypeRestaurants.objects.all()
    serializer_class = TypeRestaurantsSerializer

    def create(self, request, *args, **kwargs):
        print("Creando un nuevo tipo de restaurante")
        return super().create(request, *args, **kwargs)