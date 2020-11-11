from django.contrib import admin

from .models import Provider, Specialty, Appointment

admin.site.register(Specialty)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'provider', 'patient_first_name', 'patient_last_name')

@admin.register(Provider)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'provider_full_name', 'approved')
