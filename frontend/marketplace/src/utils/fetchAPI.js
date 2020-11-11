import {
    API_URL
} from './constants'

import isoDateString from './isodate'

/**
 * Fetch all the registed appointment for a specialty provider in a specific date
 * @param  {Date}    date Date object
 * @param  {Number}  provider Provider id
 * @return {Promese} API response in JSON format
 */
function fetchProviderAppointments(date, provider){
    return fetch(
        API_URL + '/api/providers/' + provider + '/appointments/'+ isoDateString(date) + "/"
    ).then(response => response.json())
}


/**
 * Fetch all available specialties
 * @return {Promese} API response in JSON format with all registed specialties
 */
function fetchSpecialties(){
    return fetch(API_URL + '/api/specialties/').then(response => response.json())
}


/**
 * Fetch all available providers that comply with the search parameters
 * @param  {Date}   name String to be used to filter provider name
 * @param  {String} specialty Specialty name to filter provider list
 * @return {Promese} API response in JSON format with all registed and active providers
 */
function fetchFilteredProviders(name, specialty){
    var url = API_URL + '/api/providers/filter/?'

    if (name !== ""){
        url = url + "name=" + encodeURIComponent(name);
    }

    if (specialty !== ""){
        url = url + "&specialty=" + encodeURIComponent(specialty);
    }

    return fetch(url).then(response => response.json())
}


/**
 * Create an appointment on the corresponding provider using user selected info
 * @param  {appointment} appointment Appointment object with all the required fields
 * @return {Promese} API response in JSON format with the newly created appointments or errors
 */
function createAppointment(appointment){
    var start = appointment.startTime.split(":")
    var end = appointment.endTime.split(":")

    appointment.date.setHours(start[0], start[1]);
    var startDate = appointment.date.toISOString()

    appointment.date.setHours(end[0], end[1]);
    var endDate = appointment.date.toISOString()

    return fetch(API_URL + '/api/appointments/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "start_time": startDate,
            "end_time": endDate,
            "appointment_reason": appointment.reason,
            "patient_first_name": appointment.firstName,
            "patient_initial": appointment.initial,
            "patient_last_name": appointment.lastName,
            "patient_gender": appointment.gender,
            "patient_date_of_birth": appointment.birthDate,
            "patient_phone_number": appointment.phone,
            "provider": appointment.provider
        })
    })
    .then(response => response.json())
}


/**
 * Create a provider submition with the user input
 * @param  {provider} data Provider object with all the required fields
 * @return {Promese} API response in JSON format with the newly created provider or errors
 */
function createProviderSubmition(data){
    return fetch(API_URL + '/api/providers/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "provider_full_name": data.provider_full_name,
            "country": data.country,
            "city": data.city,
            "description": data.description,
            "specialty": data.specialty
        })
    })
    .then(response => response.json())
}

export {
    fetchProviderAppointments,
    fetchFilteredProviders,
    fetchSpecialties,
    createAppointment,
    createProviderSubmition,
}
