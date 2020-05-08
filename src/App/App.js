import React from 'react';
import NavBar from '../NavBar';
import Section from '../Section';
import Info from '../Info';
import LeagueTable from '../LeagueTable';
import Fixtures from '../Fixtures';
import TeamCard from '../TeamCard';
import { scheduleMatches, getEligibleSeasons, buildResults } from '../utils/scheduling';

const TIME_BETWEEN_FIXTURES = 250;

const INITIAL_STATE = {
  selectedTeams: [],
  activeSeasons: [],
  fixtures: [],
  isPlaying :false,
  results: {},
}

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    teams: this.props.data,
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

  playSeason = async (delay = false) => {
    const { teams, activeSeasons, fixtures } = this.state;
    this.setState({
      results: {},
      isPlaying: true
    });
    await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_FIXTURES * 2));
    const allResults = buildResults(teams, activeSeasons);
    const results = {};
    for (let i = 0; i < fixtures.length; i += 1) {
      fixtures[i].forEach(fixture => {
        const homeAway = fixture.join('');
        const season = this.getRandomSeason();
        results[homeAway] = {
          result: allResults[season][homeAway],
          season,
        };
      });
      if (delay) {
        await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_FIXTURES))
          .then(() => this.setState({ results }));
      }
    }
    this.setState({
      results,
      isPlaying: false,
    });
  }

  reset = () => this.setState(INITIAL_STATE);

  render() {
    const { teams, selectedTeams, activeSeasons, fixtures, isPlaying, results } = this.state;
    const isSelected = team => selectedTeams.includes(team.shortName);

    return (
      <div className="App">
        <NavBar
          canPlay={selectedTeams.length > 1}
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
              <>
                <Section
                  title="Eligible Seasons"
                  content={() => <div className="box is-size-7">{activeSeasons.join(', ')}</div>}
                />
                <Section
                  title="League Table"
                  content={() => (
                    <LeagueTable teams={teams} selectedTeams={selectedTeams} results={results} />
                  )}
                />
              </>
            )}
            {!!fixtures.length && (
              <Section
                title="Fixtures"
                content={() => (
                  <Fixtures fixtures={fixtures} results={results} />
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
