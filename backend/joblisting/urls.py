from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'joblist', views.JobViewSet, basename='snippet')

urlpatterns = [
    path('register/candidate/', views.CandidateRegistrationView.as_view(), name='candidate_register'),
    path('register/company/', views.CompanyRegistrationView.as_view(), name='company_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.CustomUserView.as_view(), name='custom_user'),
    path('savedjobslist/', views.SavedJobsList.as_view(), name='saved_jobs'),
    path('savejob/', views.SaveJobView.as_view(), name='save_job'),
    path('', include(router.urls))
]