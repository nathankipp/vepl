import React from 'react';
import {
  computeGD,
  computePoints,
  incrementStats,
  rankTeams,
} from '../utils/leagueTable';

function computeStandings(results, teams) {
  const teamName = teams.reduce((acc, curr) =>  {
    acc[curr.shortName] = curr.name;
    return acc;
  }, {});

  const standings = [];
  const findIndex = str =>
    standings.findIndex(({ shortName }) => shortName === str);

  Object.keys(results).forEach(homeAway => {
    const home = homeAway.substr(0,3);
    const away = homeAway.substr(3);
    const index = {
      home: findIndex(home),
      away: findIndex(away),
    };

    const fixture = {
      home: {
        shortName: home,
        name: teamName[home],
        standings: standings[index.home],
      },
      away: {
        shortName: away,
        name: teamName[away],
        standings: standings[index.away],
      },
      score: results[homeAway].result,
    };

    ['home', 'away'].forEach(team => {
      const updatedStandings = incrementStats(team)(fixture);
      if (!fixture[team].standings) {
        standings.push(updatedStandings);
      } else {
        const ref = index[team];
        standings[ref] = {
          ...standings[ref],
          ...updatedStandings,
        };
      }
    });
  });

  return rankTeams(standings);
}

const LeagueTable = ({ teams, selectedTeams, results }) => {
  const standings = Object.keys(results).length
    ? computeStandings(results, teams)
    : selectedTeams.map(team => ({
        name: teams.find(({ shortName }) => shortName === team).name,
        played: 0,
        win: 0,
        loss: 0,
        draw: 0,
        gf: 0,
        ga: 0,
      }
    ));
  return (
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Team</th>
          <th>Pld</th>
          <th>W</th>
          <th>L</th>
          <th>D</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
      {
        standings.map((row, pos) => (
          <tr key={row.name}>
            <td>{pos + 1}</td>
            <td>{row.name}</td>
            <td>{row.played}</td>
            <td>{row.win}</td>
            <td>{row.loss}</td>
            <td>{row.draw}</td>
            <td>{row.gf}</td>
            <td>{row.ga}</td>
            <td>{computeGD(row)}</td>
            <td>{computePoints(row)}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

export default LeagueTable;
