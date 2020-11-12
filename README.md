# Introduction

The project will consist of building a prototype version of a Medical Provider Marketplace where people can find a doctor or other healthcare provider to book an Appointment with. People should be able to search the marketplace for Providers. They should also be able see a list of all medical Providers. Finally, they should be able to select a provider and submit a request for an Appointment with the Provider.

# User Stories

- As a patient, I want to see a list of all health providers in the Marketplace.

- As a patient, I want to search for health providers in the Marketplace by name.

- As a patient, I want to search for health providers in the Marketplace by specialty.

- As a patient, I want to select a provider to book an appointment with.

- As a patient, I want to fill in my information for the appointment request, including my preferred time and day, and be able to submit the request.

- As a new provider, I want to submit a request to be added to the Marketplace.


# Getting Started

The project is divided in two main components, backend and frontend. The backend is build is Django Framework used to build a REST Api to manage the data storage. An administration system is included for admin user to manage and approve provider submissions. The frontend is build in React as a single page application to search providers, request new provider and create appointments for a specific provider.

# BACKEND

To run the backend locally is recommended to create a virtual environment.

```
pip install virtualenv
virtualenv venv

# Activate environment
source venv/bin/activate
```

With the virtual environment activated we can install all the required python libraries. To install all dependencies run:

```
cd backend
pip install -r requirements.txt
```

Once inside the the backend folder the database must be initialize by running

```
python manage.py migrate
```

This will generate a new SQLite database with all the data structure necessary to run the application.

###### OPTIONAL (recommended)

There is a data dump names ```test-data.json``` that can be imported to populate the database with usable data and a default superuser. To load the data run

```
python manage.py loaddata test-data.json

# user : admin
# pass : default2020

```

To create a new superuser you can run the create super user command and follow the instruction.

```
python manage.py createsuperuser
```

#### LOCAL SERVER

To run a local server use the command
```
python manage.py runserver
```

To run tests use the ```python manage.py test```


# FRONTEND

The frontend consist on a single page application build in React. To run the application locally is required to have installed ```nodejs``` and ```yarn```. To install the required dependencies run yarn in the frontend folder.

```
cd frontend
yarn
```

To be able to communicate with the backend make sure that API_URL is configured with the backend domain.

```
vim marketplace/src/utils/constants.js
# var API_URL = "http://localhost:8000";

```

To run the local server run ```yarn start``` from the ```marketplace``` folder and navigate to ```http://localhost:3000``` in your browser. Tests can be run using ```yarn test```


#### USE CASES

1. User can see a list of providers on the right sidebar
2. User can filter that provider list by name or specialty using the top form
3. User can click on desire provider for more information
4. User can fill the appointment creation form to request an appointment
5. User can see the occupied in the side calendar to better select the date and time of their request
6. A new provider can request to be included on the provider list filling the form show by clicking the top left
7. Providers can be approved by Admin Users editing the approval flag

#### TODO
- Add react router to manage content page
- Add map view to show providers when one is not selected
- Add context to manage state and eventually users
- Improve error catching for data fetching
- Move appointemnt component to a modal to have more realstate
- ...
