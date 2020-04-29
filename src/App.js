import React from 'react';
import TeamCard from './TeamCard.js';

import data from './seasons/data.json';
const teams = data.map(({ name, shortName, seasons }) => ({
  name,
  shortName,
  seasons
}));

class App extends React.Component {
  state = {
    teams,
    selectedTeams: []
  };

  clickTeam = (team) => {
    const { selectedTeams } = this.state;
    const teams = new Set(selectedTeams);
    if (teams.has(team)) {
      teams.delete(team);
    } else {
      teams.add(team);
    }
    this.setState({ selectedTeams: Array.from(teams) });
  }

  render() {

    const { teams, selectedTeams } = this.state;
    const isSelected = team => selectedTeams.includes(team.shortName);

    let activeSeasons = [];
    teams
      .filter(isSelected)
      .forEach(team => {
        if (activeSeasons.length === 0) {
          activeSeasons = team.seasons;
        } else {
          activeSeasons = activeSeasons.filter(season => team.seasons.includes(season));
        }
      });
    const playedAllActiveSeasons = seasons =>
      activeSeasons.length === 0 || activeSeasons.filter(year => seasons.includes(year)).length;

    return (
      <div className="columns">
      <section className="section column is-7">
        <h3 className="is-size-3">Seasons in play</h3>
        <p>{activeSeasons.join(', ')}</p>
        <h3 className="is-size-3">Table</h3>
        <pre>{selectedTeams.map(shortName => teams.find(t => t.shortName === shortName).name).join('\n')}</pre>
      </section>
      <section className="section column is-5 teams">
      <h3 className="is-size-3">Choose Teams</h3>
      {
        teams.map((team) => {
          const selected = isSelected(team);
          const disabled = !playedAllActiveSeasons(team.seasons);
          return (
            <TeamCard
              key={team.shortName}
              team={team}
              click={this.clickTeam}
              selected={selected}
              disabled={disabled}
            />
          );
        })
      }
      </section>
      </div>
    );
  }
}

export default App;
