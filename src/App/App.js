import React from 'react';
import './App.scss';
import TeamCard from '../TeamCard';
import Match from '../Match';
import { scheduleMatches, getEligibleSeasons } from '../utils/scheduling';

import data from '../seasons/data.json';

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
      <div className="App">
        <div>

          <h3>Seasons in play</h3>
          <p>{activeSeasons.join(', ')}</p>

          <h3>Table</h3>
          <pre>{selectedTeams.map(shortName => teams.find(t => t.shortName === shortName).name).join('\n')}</pre>

          <h3>Schedule</h3>
          {fixtures.map(
            (week, i) => (
              <div key={`week${i}`} className="column is-6">
              <h5>Week {`${i+1}`}</h5>
              <div className="match">
              {week.map(fixture => {
                const home = teams.find(({ shortName }) => shortName === fixture[0]);
                const away = teams.find(({ shortName }) => shortName === fixture[1]);
                return <Match key={fixture.join('')} home={home} away={away} />;
              })}
              </div>
              </div>
            )
          )}

        </div>
        <div>

          <h3>Choose Teams</h3>
          {
            teams.map((team) => {
              const selected = isSelected(team);
              const disabled = !playedAllActiveSeasons(team.seasons);
              return (
                !disabled && <TeamCard
                  key={team.shortName}
                  team={team}
                  click={this.clickTeam}
                  selected={selected}
                />
              );
            })
          }

        </div>
      </div>
    );
  }
}

export default App;
