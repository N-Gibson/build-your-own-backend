# build-your-own-backend

## Documentation - English Premiere League(EPL) Backend

  - Setup
  - Clone this repository
  - cd into repo
  - run npm install
  - run nodemon server.js
  
note: since this server is hosted locally on your machine. All API URL's will be prefaced with http://localhost:3000

### Endpoints

This API consitst of 9 endpoints. There is a root get request, indicating that the back end is up and running correctly. From there, are 4 GET endpoints, 2 POST endpoints and 2 DELETE endpoints. 

| Method | URL | Options | Sample Result |
| ------ | --- | ------- | --------------|
| GET | /api/v1/teams | none | ``` [{ "id": 1, "name": "Arsenal FC", "area": "England", "venue": "Emirates Stadium",  "crestUrl": "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", "founded": "1886", "clubColors": "Red / White", "true": null }, { "id": 2, "name": "Aston Villa FC", "area": "England", "venue": "Villa Park", "crestUrl": "http://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg", "founded": "1872", "clubColors": "Claret / Sky Blue", "true": null }] ``` |
| --- | --------------- | ---- | -------- |    
| GET | /api/v1/players | none | ``` [{ "id": 1, "name": "Emiliano Martínez", "position": "Goalkeeper", "nationality": "Argentina", "role": "PLAYER", "shirtNumber": null, "team_id": 1, "true": null }, { "id": 2, "name": "Matt Macey", "position": "Goalkeeper", "nationality": "England", "role": "PLAYER", "shirtNumber": null, "team_id": 1, "true": null } ``` |
    

