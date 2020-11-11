import django_filters.rest_framework

from .models import Provider, Specialty, Appointment
from rest_framework import serializers

from datetime import datetime, timedelta
import pytz


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ['id', 'name']


class ProviderSerializer(serializers.ModelSerializer):
    specialty = serializers.SlugRelatedField(
        queryset=Specialty.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Provider
        fields = ['id', 'provider_full_name', 'country', 'city', 'description', 'specialty']
        ordering = ['provider_full_name']



class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

    def validate(self, attrs):
        """
        Validate appointment times and check for overlaps
        """

        now = pytz.UTC.localize(datetime.now())

        if attrs['start_time'] < now:
            raise serializers.ValidationError('start time is in the past')

        if attrs['end_time'] < attrs['start_time']:
            raise serializers.ValidationError("finish must occur after start")

        current_appointments = Appointment.objects.filter(
            provider_id=attrs["provider"],
            start_time__date=attrs['start_time'].date()
        )

        for appointment in current_appointments:
            latest_start = max(appointment.start_time, attrs['start_time'])
            earliest_end = min(appointment.end_time, attrs['end_time'])
            if (earliest_end - latest_start) > timedelta(0):
                raise serializers.ValidationError('Overlap with appointment ' + str(appointment.start_time) + ":" + str(appointment.end_time))

        return attrs

class AppointmentDeidentifiedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'start_time', 'end_time']
