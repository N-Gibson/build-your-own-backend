# build-your-own-backend

## Documentation - English Premiere League(EPL) Backend
 My project board can be viewed here at GitHub [Projects](https://github.com/N-Gibson/build-your-own-backend/projects/1)
 
### Technology
  - Node.js
  - Express.js
  - Knex
  - Postgress

### Heroku 
  - This API is deployed here on [Heroku](https://build-be.herokuapp.com/). All endpoints can be accessed there rather than cloning the application locally.

### Endpoints

This API consitst of 9 endpoints. There is a root get request, indicating that the back end is up and running correctly. From there, are 4 GET endpoints, 2 POST endpoints and 2 DELETE endpoints. 

| Method | URL | Options | Sample Result |
| ------ | --- | ------- | --------------|
| GET | /api/v1/teams | none | ``` [{ "id": 1, "name": "Arsenal FC", "area": "England", "venue": "Emirates Stadium",  "crestUrl": "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", "founded": "1886", "clubColors": "Red / White", "true": null }, { "id": 2, "name": "Aston Villa FC", "area": "England", "venue": "Villa Park", "crestUrl": "http://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg", "founded": "1872", "clubColors": "Claret / Sky Blue", "true": null }] ``` |
| GET | /api/v1/players | none | ``` [{ "id": 1, "name": "Emiliano Martínez", "position": "Goalkeeper", "nationality": "Argentina", "role": "PLAYER", "shirtNumber": null, "team_id": 1, "true": null }, { "id": 2, "name": "Matt Macey", "position": "Goalkeeper", "nationality": "England", "role": "PLAYER", "shirtNumber": null, "team_id": 1, "true": null } ``` |
| GET | /api/v1/teams/:id | [id] (integer) | ``` [{ "id": 9, "name": "Manchester City FC", "area": "England", "venue": "Etihad Stadium", "crestUrl": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", "founded": "1880", "clubColors": "Sky Blue / White", "true": null }] ``` |
| GET | /api/v1/players/:id | [id] (integer) | ``` [{ "id": 11, "name": "David Luiz", "position": "Defender", "nationality": "Brazil", "role": "PLAYER", "shirtNumber": 23, "team_id": 1, "true": null }] ``` |
| POST | /api/v1/teams| ``` { "name": "Chelsea", "area": "England", "venue": "Stamford Bridge", "crestUrl": 'http://example.url.crest', "founded": "1905", "clubColors": "Royal Blue / White" } ``` | ``` [{ "id": 5, "name": "Chelsea FC", "area": "England", "venue": "Stamford Bridge", "crestUrl": "http://upload.wikimedia.org/wikipedia/de/5/5c/Chelsea_crest.svg", "founded": "1905", "clubColors": "Royal Blue / White", "true": null }] ``` |
| POST | /api/v1/players | ``` { "name": "Eden Hazard", "positon": "Forward", "nationality": "Belgium", "shirtNumber": 10, "role": "Player", "team_id": 5 } ``` | ``` { "id": 6976 } ``` |
| DELETE | /api/v1/teams/:id | [id] (integer) |  ``` { "player": 1, "id": "6976" } ``` |
| DELETE | /api/v1/players/:id | [id] (integer) | ``` { "team": 1, "id": "16" } ``` |    

