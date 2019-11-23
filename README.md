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
| GET | /api/v1/players | none | ``` [{ "id": 1, "name": "Emiliano Martínez", "position": "Goalkeeper", "nationality": "Argentina", "role": "PLAYER", "shirtNumber": null, "team_id": 1, "true": null }, { "id": 2, "name": "Matt Macey", "position": "Goalkeeper", "nationality": "England", "role": "PLAYER", "shirtNumber": null, "team_id": 1, "true": null } ``` |
| GET | /api/v1/teams/:id | [id] (number) | ``` [{ "id": 9, "name": "Manchester City FC", "area": "England", "venue": "Etihad Stadium", "crestUrl": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", "founded": "1880", "clubColors": "Sky Blue / White", "true": null }] ``` |
| GET | /api/v1/players/:id | [id] (number) | ``` [{ "id": 11, "name": "David Luiz", "position": "Defender", "nationality": "Brazil", "role": "PLAYER", "shirtNumber": 23, "team_id": 1, "true": null }] ``` |
| POST | /api/v1/teams| ``` { name: 'Eden Hazard', area: 'England', venue: 'Stamford Bridge', crestUrl: 'https://www.google.com/search?rlz=1C5CHFA_enUS843US843&biw=1440&bih=789&tbm=isch&sxsrf=ACYBGNSxaY5nkFbEEbGpHLST4w4kkkUysQ%3A1574550611420&sa=1&ei=U7zZXf6HGf_E0PEPhq-bmAg&q=chelsea+crest+png&oq=chelsea+crest+png&gs_l=img.3..0j0i8i30.6734.7265..7476...0.0..0.94.330.4......0....1..gws-wiz-img.......0i67j0i24.oxfZbfdHFqA&ved=0ahUKEwi-_f6OuoHmAhV_IjQIHYbXBoMQ4dUDCAc&uact=5#imgrc=EysBMziDBIIvGM:', founded: '1905', clubColors: 'Royal Blue / White' } ``` | ``` [{ "id": 5, "name": "Chelsea FC", "area": "England", "venue": "Stamford Bridge", "crestUrl": "http://upload.wikimedia.org/wikipedia/de/5/5c/Chelsea_crest.svg", "founded": "1905", "clubColors": "Royal Blue / White", "true": null }] ``` |
    

