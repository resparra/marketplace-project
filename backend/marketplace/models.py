from django.db import models
from django.core.validators import RegexValidator


class Specialty(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Specialties"
        ordering = ('name',)


class Provider(models.Model):
    provider_full_name = models.CharField(max_length=255)
    specialty = models.ForeignKey(Specialty, on_delete=models.PROTECT)
    country = models.CharField(max_length=255)
    description = models.TextField()
    city = models.CharField(max_length=255)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.provider_full_name

    class Meta:
        ordering = ('provider_full_name',)


class Appointment(models.Model):

    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'

    GENDERS = [
        (FEMALE, 'Female'),
        (MALE, 'Male'),
        (OTHER, 'Other'),
    ]

    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    start_time = models.DateTimeField('start time')
    end_time = models.DateTimeField('end time')
    appointment_reason = models.TextField()
    patient_first_name = models.CharField(max_length=255)
    patient_initial = models.CharField(max_length=255, blank=True)
    patient_last_name = models.CharField(max_length=255)
    patient_gender = models.CharField(max_length=1, choices=GENDERS, default=OTHER)
    patient_date_of_birth = models.DateField()

    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    patient_phone_number = models.CharField(validators=[phone_regex], max_length=17)

    def __str__(self):
        return self.provider.provider_full_name + ":" + self.patient_first_name + " " + self.patient_last_name
