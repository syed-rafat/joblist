from rest_framework import generics, viewsets, permissions, status, serializers
from .serializers import CustomUserSerializer, CandidateRegistrationSerializer, CompanyRegistrationSerializer, JobSerializer, SavedJobSerializer
from .models import Job, CustomUser, SavedJob
from .permissions import IsCompanyUser, IsCandidateUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


class CandidateRegistrationView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = CandidateRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            custom_user = serializer.save()
            return Response(serializer.to_representation(custom_user), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

class CompanyRegistrationView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = CompanyRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            custom_user = serializer.save()
            return Response(serializer.to_representation(custom_user), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    # Allow everyone to access job list from GET request
    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            self.permission_classes = [IsCompanyUser]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super(JobViewSet, self).get_permissions()
    

# Saved Jobs list for a candidate users
class SavedJobsList(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsCandidateUser]

    def get_queryset(self):
        return Job.objects.filter(savedjob__candidate=self.request.user)
    

# View to return Customuser object for the logged in user
class CustomUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = CustomUser.objects.get(user=request.user)
        serializer = CustomUserSerializer(user)
        data = serializer.data
        data['username'] = request.user.username
        return Response(data)
    

class SaveJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        job_id = request.data
        data = {'job': job_id, 'candidate': request.user.id}
        serializer = SavedJobSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)