import React from 'react';
import TeamCard from './TeamCard';
import Match from './Match/Match';
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
      <section className="section">
        <div className="columns">
          <div className="column is-7">
            <h3 className="is-size-3">Seasons in play</h3>
            <p>{activeSeasons.join(', ')}</p>

            <h3 className="is-size-3">Table</h3>
            <pre>{selectedTeams.map(shortName => teams.find(t => t.shortName === shortName).name).join('\n')}</pre>

            <h3 className="is-size-3">Schedule</h3>
            <div className="columns">
              {fixtures.map(
                (week, i) => (
                  <div key={`week${i}`} className="column is-6">
                    <h5 className="is-size-5">Week {`${i+1}`}</h5>
                    <div className="box match">
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
          </div>
          <div className="column is-5">
            <h3 className="is-size-3">Choose Teams</h3>
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
                    disabled={disabled}
                  />
                );
              })
            }
          </div>
        </div>
      </section>
    );
  }
}

export default App;
