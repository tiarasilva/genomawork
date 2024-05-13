from django.urls import include, path
from rest_framework import routers
from api.views import FoodReviewsViewSet

router = routers.DefaultRouter()
router.register(r"food_reviews", FoodReviewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]