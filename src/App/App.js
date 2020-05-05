import React from 'react';
import './App.scss';
import NavBar from '../NavBar';
import LeagueTable from '../LeagueTable';
import TeamCard from '../TeamCard';
import Match from '../Match';
import { scheduleMatches, getEligibleSeasons, buildResults } from '../utils/scheduling';

const TIME_BETWEEN_FIXTURES = 0;

class App extends React.Component {
  state = {
    teams: this.props.data,
    selectedTeams: [],
    activeSeasons: [],
    fixtures: [],
    isPlaying :false,
    results: {},
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
      fixtures: scheduleMatches(selectedTeams),
      results: {},
    });
  }

  getRandomSeason = () => {
    const { activeSeasons } = this.state;
    const random = Math.floor(Math.random() * Math.floor(activeSeasons.length));
    return String(activeSeasons[random]);
  }

  async playSeason() {
    this.setState({ isPlaying: true });
    const { teams, activeSeasons, fixtures } = this.state;
    const allResults = buildResults(teams, activeSeasons);
    const results = {};
    for (let i = 0; i < fixtures.length; i += 1) {
      const play = [];
      fixtures[i].forEach(fixture => {
        const homeAway = fixture.join('');
        const season = this.getRandomSeason();
        results[homeAway] = {
          result: allResults[season][homeAway],
          season,
        };
      });
      // TODO: do we want to do delayed play-out?
      // await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_FIXTURES))
      //   .then(() => this.setState({ results }));
    }
    this.setState({
      results,
      isPlaying: false,
    });
  }

  playClickHandler = () => {
    const { fixtures, activeSeasons } = this.state;
    this.playSeason(fixtures, activeSeasons)
  };

  render() {
    const { teams, selectedTeams, activeSeasons, fixtures, isPlaying, results } = this.state;

    const isSelected = team => selectedTeams.includes(team.shortName);
    const playedAllActiveSeasons = seasons =>
      activeSeasons.length === 0 || activeSeasons.filter(year => seasons.includes(year)).length;

    return (
      <>
        <NavBar
          canPlay={!!fixtures.length}
          playClickHandler={this.playClickHandler}
          isPlaying={isPlaying}
        />
        <div className="App">
          <div>

            <h3>Seasons in play</h3>
            <p>{activeSeasons.join(', ')}</p>

            <h3>Table</h3>
            <pre>
              <LeagueTable teams={teams} results={results} />
            </pre>

            <h3>Schedule</h3>
            {fixtures.map(
              (week, i) => (
                <div key={`week${i}`} className="column is-6">
                  <h5>Week {`${i+1}`}</h5>
                  <div>
                    {week.map(fixture => {
                      const homeAway = fixture.join('');
                      // console.log(results);
                      return (
                        <Match
                          key={homeAway}
                          fixture={fixture}
                          results={results[homeAway]}
                        />
                      );
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
      </>
    );
  }
}

export default App;
