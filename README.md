# Limehome Test Application

## Setup and configuration

#### 1. Requirements

    1. MongoDB : ensure you have mongoDb install on you system and it's up and running

#### 2. Add env variables 

    1. Create a .env file in the project directory.

    2. Copy keys from env-sample to .evn and set the values appropiately 

#### 3. Start the server

    1. From the project root dir run : npm install && npm start (server should start on port 3000 )

#### 4. Running Test

    From the root directory run : npm test

#### 5. Deploy to heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/andela-Kshittu/hotel-search/tree/master)

#### Live version on heroku 

    1. swagger doc : https://limehome.herokuapp.com/api-docs/
    2. base url : https://limehome.herokuapp.com/api

#### Assumptions :

    1. No api authentication required since this is just a test
    2. No need to return all available fields in properties object
    3. Minimal info captured in bookings model.
    4. Not all Properties fields from api are documented in the the swagger properties DTO
