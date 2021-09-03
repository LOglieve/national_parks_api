# National Parks Api
an api that can deliver data about national parks in supported countries.

## Contents
- Technologies
- Features

## Technologies
- Node.js
- Express.js
- MongoDB

## Features
The currently has 3 endpoints,
  - all parks in the database
  - all parks in country depending on iso_a2 code
  - an autocomplete route

returned fields include:
  - a unique id
  - location data 
    - country
    - iso_a2
    - latitiude
    - longitude
  - annotation data
    - park name
    - native name
    - counties / region
    - area in km^2
    - area in m^2
    - when the park was officially formed
    - sources of the data

## Supported Countries
- United Kingdom / GB
- Ireland / IE
- France / FR
- New Zealand / NZ


HEROKU LINK - https://nationalparks-api.herokuapp.com/
