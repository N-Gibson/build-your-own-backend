const express = require('express');
// Line 1 is setting a variable to require Express
const app = express();
// Line 2 invokes express so that we have access to methods abstracted from Node.js

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
// Lines 6 - 9 are all configurations that let us know what environment we are in and connect to the knexfile for specific configs.

app.set('port', process.env.PORT || 3000);
// Line 11 sets the port we are on (localhost:3000)
app.use(express.json());
// Line 13 enables us to use json in formatting (otherwise the body of POST requests would throw errors)

app.locals.title = 'EPL Data Server';
// Line 16 sets the title of the server or the GET on the root 

app.listen(app.get('port'), () => {
    console.log(`App is running on ${app.get('port')}`)
});
// Line 19 is going to log in the terminal what port the server is running on when started

app.get('/', (request, response) => {
  response.send(`Welcome to ${app.locals.title}`)
});
// This is the GET endpoint for root that allows heroku to show some data on default

app.get('/api/v1/teams', (request, response) => {
  // Here I am selecting the route in which I want to select for this get request
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
        // From lines 31-36 I am first selecting the 'teams' table and upon successful request sending a 200 response and then the whole team data
    })
    .catch((err) => {
      response.status(500).json({ err });
        // Next is the catch. If there is an error there will be a 500 error code (server side error) and then display the error.
    });
});

app.get('/api/v1/teams/:id', (request, response) => {
  // First is setting the route for the request. It takes a dynamic property of an id
  const { id } = request.params;
  // This is selecting the id from the request so that it can be used to compare to the id property in the teams on line 47
  database('teams').select()
    .where({ id: id })
    .then((team) => {
      if(team.length === 0) {
        request.status(404).json('There is no team with that id.');
        // Starting on line 46 I am selecting the teams table where the id matches to the param set to the variable 'id'.
        // Then on line 48 I am asserting that if the team.length is === 0 (no team found) to send a 404 not found error.
      } else {
        response.status(200).json(team);
          // in the else block (if the team is found) I am sending a 200 success code and responding with the team object
      };
    })
    .catch((error) => {
      response.status(500).json({ error });
       // Lastly is the catch where the response is a 500 server side error and then returning the error object.
    });
});

app.get('/api/v1/players', (request, response) => {
  // Again the first step is declaring the route in which the request will be made
  database('players').select()
    .then((players) => {
      response.status(200).json(players);
        // Then I am selecting the players table and upon success will be sending a 200 code and the players.
    })
    .catch((err) => {
      response.status(500).json({ err });
       // The catch is on line 70 where a 500 code will be sent as well as the error object.
    });
});

app.get('/api/v1/players/:id', (request, response) => {
  // The route here takes a dynamic property of an id as well
  const { id } = request.params;
  // Then I am deconstructing that id and setting it to a variable
  database('players').select()
    .where({ id: id })
    .then((player) => {
      if(player.length === 0) {
        response.status(404).json('There is no player with that id.')
          // On line 81 I am selecting the players table where the id matches my variable
          // Then if there is no player found (length is 0) I will send a 404 and a message saying that there is no player with that id.
      } else {
        response.status(404).json(player);
          // If the length is not 0 i will send a 404 with the player on line 87
      };
    })
    .catch((error) => {
      response.status(500).json({ error });
        // Lastly is the catch and the 500 code along with the error
    });
});

app.post('/api/v1/teams', (request, response) => {
  // First is declaring the route in which this post request can be made.
  const team = request.body;
  // Here I am setting the request body or the options provided for the fetch to a variable
  for(let requiredParam of ['name', 'area', 'venue', 'crestUrl', 'founded', 'clubColors']) {
    if(!team[requiredParam]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, area: <String>, venue: <String>, crestUrl: <Integer>, founded: <String>, clubColors: <String> }. You\'re missing a \"${requiredParam}\" property.` })
        // On line 104 I am asserting that if there is no required parameter included in the team variable to send a 422 error (unprocessable entity) with a message stating what piece is missing as well as the format of the data.
    }
  }

  database('teams').insert(team, 'id')
    .then(team => {
      response.status(201).json({ id: team[0] });
      // Here i am selecting the teams table and inserting the new team along with a new id.
      // Then i am sending a 201 code (created) and return the new id of that team.
    })
    .catch((error) => {
      response.status(500).json({ error });
      // The catch is for any server side errors or bad requests and I am sending a 500 code as well as the error.
    });
});

app.post('/api/v1/players', (request, response) => {
  // Again I am declaring the path for the post
  const player = request.body;
  // Here I am setting the request body to a variable to use in creating the team
  for(let requiredParam of ['name', 'position', 'nationality', 'shirtNumber', 'role', 'team_id']) {
    if(!player[requiredParam]) {
      return response 
        .status(422)
        .send({ error: `Expected format: { name: <String>, position: <String>, nationality: <String>, shirtNumber: <Integer>, role: <String>, team_id: <Integer>. You\'re missing a 
      \"${requiredParam}\" property.}` })
        // On line 128 I am asserting that if there is no required parameter included in the team variable to send a 422 error (unprocessable entity) with a message stating what piece is missing as well as the format of the data.
    }
  }

  database('players').insert(player, 'id')
    .then(player => {
      response.status(201).json({ id: player[0] });
      // Here I am selecting the players table and inserting the player variable as well as a new id.
    })
    .catch(error => {
      response.status(500).json({ error });
      // The catch will run on any unsuccessful request and send a 500 error along with that error message.
    });
});

app.delete('/api/v1/teams/:id', (request, response) => {
  // The route for this delete request requires a dynamic property of an id.
  const { id } = request.params;
  // Here I am deconstructing the id from the request params and setting it to a variable to compare to the teams id on line 155

  database('teams')
    .where({ id: id })
    .del()
    .then((team) => {
      response.status(201).json({ team, id });
      // Line 154 selects the teams database and if the id's match I delete that team. 
      // Then I send a response code of 201(fulfilled) and return the team deleted and the id.
    })
    .catch((error) => {
      response.status(422).json({ error });
      // The catch here sends a 422(unprocessable entity) and the error.
    });
});

app.delete('/api/v1/players/:id', (request, response) => {
  // This delete request also requires a dynamic id 
  const { id } = request.params;
  // Again I am deconstructing the id from the request params.
  database('players')
    .where({ id: id })
    .del()
    .then((player) => {
      response.status(201).json({ player, id });
      // On line 172 I select the players table and if the id's match I remove that player from the table.
      // Then I send a 201 code along with the player and id upon successful deletion.
    })
    .catch((error) => {
      response.status(422).json({ error });
      // The catch here is for any unsuccessful requests and it sends the 422 status code along with the error.
    });
});