import json
import pytz
from rest_framework import status
from django.test import TestCase, Client
from rest_framework.reverse import reverse
from .models import Specialty, Provider, Appointment
from .serializers import SpecialtySerializer, ProviderSerializer, AppointmentSerializer
from datetime import datetime

# initialize the APIClient app
client = Client()

class SpecialtyTest(TestCase):
    """ Test module for Specialty model """

    def setUp(self):
        Specialty.objects.create(name='Cardiology')

    def test_specialty_create(self):
        specialty_cardiology = Specialty.objects.get(name='Cardiology')
        self.assertEqual(specialty_cardiology.name, 'Cardiology')


class ProviderTest(TestCase):
    """ Test module for Provider model """

    def setUp(self):
        specialty = Specialty.objects.create(name='Cardiology')
        provider_cardiology = Provider.objects.create(
            provider_full_name='Provider Test',
            specialty=specialty
        )

    def test_provider_create(self):
        provider_cardiology = Provider.objects.get(provider_full_name='Provider Test')
        self.assertEqual(provider_cardiology.specialty.name, 'Cardiology')


class GetAllSpecialtiesTest(TestCase):
    """ Test module for GET all specialties API """

    def setUp(self):
        Specialty.objects.create(name='Cardiology')
        Specialty.objects.create(name='Dentists')
        Specialty.objects.create(name='Pediatric')
        Specialty.objects.create(name='Generalist')

    def test_get_all_specialties(self):
        # get API response
        response = client.get(reverse('specialties-list'))
        # get data from db
        specialties = Specialty.objects.all()
        serializer = SpecialtySerializer(specialties.order_by("name"), many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetProvidersPagesTest(TestCase):
    """ Test module for GET all specialties API """

    def setUp(self):
        specialty = Specialty.objects.create(name='Cardiology')

        for i in range(15):
            Provider.objects.create(
                provider_full_name='Provider Test ' + str(i),
                specialty=specialty
            )

    def test_get_all_providers(self):
        # get API response
        response = client.get(reverse('providers-list'))
        # get data from db
        providers = Provider.objects.all()

        serializer = ProviderSerializer(providers, many=True)

        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateProviderAppointmentTest(TestCase):
    """ Test module for GET all specialties API """

    def setUp(self):
        specialty = Specialty.objects.create(name='Cardiology')
        provider = Provider.objects.create(provider_full_name='Provider Test', specialty=specialty)

        Appointment.objects.create(
            provider=provider,
            start_time=datetime(2020, 12, 10, 10, 10, tzinfo=pytz.UTC),
            end_time=datetime(2020, 12, 10, 10, 12, tzinfo=pytz.UTC),
            appointment_reason="reason",
            patient_first_name="Name",
            patient_initial="I",
            patient_last_name="LastName",
            patient_gender="F",
            patient_date_of_birth="2000-10-10",
            patient_phone_number="+17877871234"
        )

    def test_overlap_appointment(self):
        provider = Provider.objects.get(provider_full_name='Provider Test')
        response = client.post(reverse('appointments-list'), {
            'provider': provider.id,
            'start_time': datetime(2020, 12, 10, 10, 11, tzinfo=pytz.UTC),
            'end_time': datetime(2020, 12, 10, 10, 13, tzinfo=pytz.UTC),
            'appointment_reason': 'reason',
            'patient_first_name': 'Name',
            'patient_initial': 'I',
            'patient_last_name': 'LastName',
            'patient_gender': 'F',
            'patient_date_of_birth': "2000-10-10",
            'patient_phone_number': '+1787787123'
        })

        expected = json.dumps({
            'validation_error': ['Overlap with appointment 2020-12-10 14:10:00+00:00:2020-12-10 14:12:00+00:00']
        })

        self.assertEqual(json.dumps(response.data), expected)

    def test_start_time_in_past(self):
        provider = Provider.objects.get(provider_full_name='Provider Test')
        response = client.post(reverse('appointments-list'), {
            'provider': provider.id,
            'start_time': datetime(2020, 9, 10, 10, 11, tzinfo=pytz.UTC),
            'end_time': datetime(2020, 9, 10, 10, 13, tzinfo=pytz.UTC),
            'appointment_reason': 'reason',
            'patient_first_name': 'Name',
            'patient_initial': 'I',
            'patient_last_name': 'LastName',
            'patient_gender': 'F',
            'patient_date_of_birth': "2000-10-10",
            'patient_phone_number': '+1787787123'
        })

        expected = json.dumps({"validation_error": ["start time is in the past"]})

        self.assertEqual(json.dumps(response.data), expected)
