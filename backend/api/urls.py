from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HealthCheckView, ItemViewSet, UserViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('', include(router.urls)),
]
