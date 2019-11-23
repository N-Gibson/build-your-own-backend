// const teamsData = require( '../../../data/team');
// const playersData = require('../../../data/players');
const data = require('../../../data/data');

const createTeam = (knex, team) => {
  return knex('teams')
    .insert({
      name: team.name,
      area: team.area.name,
      venue: team.venue,
      crestUrl: team.crestUrl,
      founded: team.founded,
      clubColors: team.clubColors,
    }, 'id')
    .then(teamId => {
      let playerPromises = [];
      data.forEach(team => {
        team.squad.forEach(player => {
          playerPromises.push(createPlayer(knex, {
            name: player.name,
            position: player.position,
            nationality: player.nationality,
            shirtNumber: player.shirtNumber,
            role: player.role,
            team_id: teamId[0],
          })
        )
      });
    })
    return Promise.all(playerPromises);
  })
};

const createPlayer = (knex, player) => {
  return knex('players').insert(player);
};

exports.seed = (knex) => {
  return knex('players').del()
    .then(() => knex('teams').del())
    .then(() => {
      let teamPromises = [];

      data.forEach(team => {
        teamPromises.push(createTeam(knex, team));
      });
      return Promise.all(teamPromises);
    })
    .catch(error => console.error(`Error seeding data: ${error}`));
}
