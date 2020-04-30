import React from 'react';
import TeamCard from './TeamCard.js';
import { scheduleMatches, getEligibleSeasons } from './utils/scheduling';

import data from './seasons/data.json';

class App extends React.Component {
  state = {
    teams: data,
    selectedTeams: [],
    activeSeasons: [],
    fixtures: []
  };

  clickTeam = (team) => {
    const { teams, selectedTeams: selected } = this.state;

    let selectedTeams = new Set(selected);
    if (selectedTeams.has(team)) {
      selectedTeams.delete(team);
    } else {
      selectedTeams.add(team);
    }
    selectedTeams = Array.from(selectedTeams);

    this.setState({
      selectedTeams,
      activeSeasons: getEligibleSeasons(teams, selectedTeams),
      fixtures: scheduleMatches(selectedTeams)
    });
  }

  render() {
    const { teams, selectedTeams, activeSeasons, fixtures } = this.state;

    const isSelected = team => selectedTeams.includes(team.shortName);
    const playedAllActiveSeasons = seasons =>
      activeSeasons.length === 0 || activeSeasons.filter(year => seasons.includes(year)).length;

    return (
      <div className="columns">
      <section className="section column is-7">
        <h3 className="is-size-3">Seasons in play</h3>
        <p>{activeSeasons.join(', ')}</p>

        <h3 className="is-size-3">Table</h3>
        <pre>{selectedTeams.map(shortName => teams.find(t => t.shortName === shortName).name).join('\n')}</pre>

        <h3 className="is-size-3">Schedule</h3>
        {fixtures.map(
          (week, i) => (
            <pre key={`week${i}`}>
              <b>Week {`${i+1}`}</b><br />
              {week.map(teams => `${teams[0]} v ${teams[1]}\n`)}
            </pre>
          )
        )}
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
