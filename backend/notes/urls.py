from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, NoteViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Custom explicit paths for Notes instead of Router
    path('custom-notes/', NoteViewSet.as_view({'get': 'list', 'post': 'create'}), name='note-list'),
    path('custom-notes/<int:pk>/', NoteViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='note-detail'),
]
