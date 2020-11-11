from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers

from marketplace.views import ProviderViewSet, SpecialtyViewSet, ProviderFilteredList, AppointmentViewSet, AppointmentProviderList

from django.urls import register_converter
from datetime import datetime


router = routers.DefaultRouter()
router.register(r'providers', ProviderViewSet, 'providers')
router.register(r'specialties', SpecialtyViewSet, 'specialties')
router.register(r'appointments', AppointmentViewSet, 'appointments')


class IsoDateConverter:
    """ Manage iso format dates as url parameter """

    regex = '\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        return datetime.strptime(value, '%Y-%m-%d').date()

    def to_url(self, value):
        return str(value)


register_converter(IsoDateConverter, 'isodate')


urlpatterns = [
    path('providers/filter/', ProviderFilteredList.as_view(), name='providers-filter'),
    path('providers/<int:provider_id>/appointments/<isodate:date>/', AppointmentProviderList.as_view(), name='providers-appointments'),
    path('', include(router.urls)),
]
