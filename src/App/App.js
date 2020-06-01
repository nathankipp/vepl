import React from 'react';
import NavBar from '../NavBar';
import Section from '../Section';
import Info from '../Info';
import LeagueTable from '../LeagueTable';
import Fixtures from '../Fixtures';
import TeamCard from '../TeamCard';
import { scheduleMatches, getEligibleSeasons, buildResults } from '../utils/scheduling';

const INITIAL_STATE = {
  selectedTeams: [],
  activeSeasons: [],
  fixtures: [],
  isWorking: false,
  isPlaying :false,
  iterations: 1,
  results: {},
}

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    teams: this.props.data,
  };

  scheduleMatches = () => {
    const { iterations, selectedTeams } = this.state;
    const roundRobin = scheduleMatches(selectedTeams);
    const fixtures = [];
    for (let i = 0; i < iterations; i += 1) {
      fixtures.push(...roundRobin);
    }
    return fixtures;
  }

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
      iterations: 1,
      results: {},
    }, () => {
      this.setState({
        fixtures: this.scheduleMatches()
      });
    });
  }

  getRandomSeason = () => {
    const { activeSeasons } = this.state;
    const random = Math.floor(Math.random() * Math.floor(activeSeasons.length));
    return String(activeSeasons[random]);
  }

  getResults = () => {
    const { teams, activeSeasons, fixtures } = this.state;
    const allResults = buildResults(teams, activeSeasons);
    const results = {};
    for (let i = 0; i < fixtures.length; i += 1) {
      fixtures[i].forEach(fixture => {
        const homeAway = fixture.join('');
        const season = this.getRandomSeason();
        results[`${homeAway}.${i}`] = {
          result: allResults[season][homeAway],
          season,
        };
      });
    }
    return results;
  }

  playSeason = () => {
    this.setState({
      isWorking: true,
      isPlaying: true,
      results: {},
    }, () => {
      new Promise(resolve => {
        setTimeout(() => {
          const results = this.getResults();
          resolve(results);
        }, 0);
      }).then(results => {
        this.setState({
          isWorking: false,
          isPlaying: false,
          results,
        });
      });
    });
  }

  playSeries = (iterations) => {
    this.setState({
      isWorking: true,
      iterations,
      fixtures: [],
      results: {},
    }, () => {
      new Promise(resolve => {
        setTimeout(() => {
          const fixtures = this.scheduleMatches();
          resolve(fixtures);
        }, 0);
      }).then(fixtures => {
        this.setState({
          isWorking: false,
          fixtures,
        });
      });
    });
  }

  reset = () => this.setState(INITIAL_STATE);

  render() {
    const {
      teams,
      selectedTeams,
      activeSeasons,
      fixtures,
      isWorking,
      isPlaying,
      iterations,
      results
    } = this.state;
    const isSelected = team => selectedTeams.includes(team.shortName);

    return (
      <div className="App">
        <NavBar
          canPlay={!isWorking && selectedTeams.length > 1}
          playClickHandler={this.playSeason}
          isPlaying={isPlaying}
          reset={this.reset}
        />
        <div className="App__content">
          <div className="App__content--half">
            {!selectedTeams.length && !fixtures.length && (
              <Section title="The Virtual EPL" content={Info} />
            )}
            {!!selectedTeams.length && (
              <Section
                title="Eligible Seasons"
                content={() => <div className="box is-size-7">{activeSeasons.join(', ')}</div>}
              />
            )}
            {selectedTeams.length > 1 && (
              <Section
                title="League Table"
                content={() => (
                  <LeagueTable
                    teams={teams}
                    selectedTeams={selectedTeams}
                    iterations={iterations}
                    isWorking={isWorking}
                    playSeries={this.playSeries}
                    results={results}
                  />
                )}
              />
            )}
            {!!fixtures.length && (
              <Section
                title="Fixtures"
                content={() => (
                  <Fixtures
                    iterations={iterations}
                    fixtures={fixtures}
                    results={results}
                  />
                )}
              />
            )}
          </div>
          <div className="App__content--half">
            <Section
              title="Select Teams"
              content={() => (
                <div className="Team-Cards">
                  {teams.map((team) => {
                    const selected = isSelected(team);
                    return (
                      <TeamCard
                        key={team.shortName}
                        team={team}
                        activeSeasons={activeSeasons}
                        click={this.clickTeam}
                        selected={selected}
                      />
                    );
                  })}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
