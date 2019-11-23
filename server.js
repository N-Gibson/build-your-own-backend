const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.set('port', process.env.PORT || 3000);
app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});
app.listen(app.get('port'), () => {
    console.log(`App is running on ${app.get('port')}`)
});

app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/players', (request, response) => {
  database('players').select()
    .then((players) => {
      response.status(200).json(players);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;

  for(let requiredParam of ['name', 'position', 'nationality', 'shirtNumber', 'role']) {
    if(!team[requiredParam]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, position: <String>, nationality: <String>, shirtNumber: <String>, role: <String> }. You\'re missing a \"${requiredParam}\" property.` })
    }
  }
})