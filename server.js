const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.set('port', process.env.PORT || 3000);

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

app.get('/api/v1/teams/:id', (request, response) => {
  const { id } = request.params;
  database('teams').select()
    .where({ id: id })
    .then((team) => {
      if(team.length === 0) {
        request.status(404).json('There is no team with that id.');
      } else {
        response.status(200).json(team);
      };
    })
    .catch((error) => {
      response.status(500).json({ error });
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

app.get('/api/v1/players/:id', (request, response) => {
  const { id } = request.params;
  database('players').select()
    .where({ id: id })
    .then((player) => {
      if(player.length === 0) {
        response.status(404).json('There is no player with that id.')
      } else {
        response.status(404).json(player);
      };
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;

  for(let requiredParam of ['name', 'area', 'venue', 'crestUrl', 'founded', 'clubColors']) {
    if(!team[requiredParam]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, area: <String>, venue: <String>, crestUrl: <String>, founded: <String>, clubColors: <String> }. You\'re missing a \"${requiredParam}\" property.` })
    }
  }

  database('teams').insert(team, 'id')
    .then(team => {
      response.status(201).json({ id: team[0] })
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/players', (request, response) => {
  const player = request.body;

  for(let requiredParam of ['name', 'position', 'nationality', 'shirtNumber', 'role', 'team_id']) {
    if(!player[requiredParam]) {
      return response 
        .status(422)
        .send({ error: `Expected format: { name: <String>, position: <String>, nationality: <String>, shirtNumber: <String>, role: <String>, team_id: <String>. You\'re missing a 
      \"${requiredParam}\" property.}` })
    };
  };
});