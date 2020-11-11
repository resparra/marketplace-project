from django.http import HttpResponse
from .models import Provider, Specialty, Appointment
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ProviderSerializer, SpecialtySerializer, AppointmentSerializer, AppointmentDeidentifiedSerializer

from rest_framework import generics

def index(request):
    return HttpResponse("Server is up")


class ProviderViewSet(viewsets.ModelViewSet):
    """
    API endpoint to create providers.
    """
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer


class SpecialtyViewSet(viewsets.ModelViewSet):
    """
    API endpoint to list Specialties.
    """
    queryset = Specialty.objects.all()
    serializer_class = SpecialtySerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Appointments to be created.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    http_method_names = ['post']


class ProviderFilteredList(generics.ListAPIView):
    """
    API endpoint to get providers filtered by name and/or specialty
    """
    serializer_class = ProviderSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Provider.objects.filter(approved=True)
        specialty = self.request.query_params.get('specialty', None)
        provider_name = self.request.query_params.get('name', None)

        if specialty is not None:
            queryset = queryset.filter(specialty__name=specialty)

        if provider_name is not None:
            queryset = queryset.filter(provider_full_name__contains=provider_name)

        return queryset


class AppointmentProviderList(generics.ListAPIView):
    """
    API endpoint to get de-identified appointments for a specific provider and date
    """
    serializer_class = AppointmentDeidentifiedSerializer

    def get_queryset(self, **kwargs):
        """
        Optionally restricts the returned purchases to a given user
        """

        return Appointment.objects.filter(
            provider_id=self.kwargs["provider_id"],
            start_time__date=self.kwargs['date']
        )
