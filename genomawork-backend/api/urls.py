from django.urls import include, path
from rest_framework import routers
from api.views import FoodReviewsViewSet, TypeRestaurantsViewSet

router = routers.DefaultRouter()
router.register(r"food_reviews", FoodReviewsViewSet)
router.register(r"type_restaurants", TypeRestaurantsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]