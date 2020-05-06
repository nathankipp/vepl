import React from 'react';
import './LeagueTable.scss';
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
        shortName: team,
        played: 0,
        win: 0,
        loss: 0,
        draw: 0,
        gf: 0,
        ga: 0,
      }
    ));
  return (
    <div className="box">
      <table className="table is-fullwidth is-narrow">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th className="is-hidden-mobile">Pld</th>
            <th className="is-hidden-mobile">W</th>
            <th className="is-hidden-mobile">L</th>
            <th className="is-hidden-mobile">D</th>
            <th className="is-hidden-touch">GF</th>
            <th className="is-hidden-touch">GA</th>
            <th className="is-hidden-touch">GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
        {
          standings.map((row, pos) => (
            <tr key={row.name}>
              <td>{pos + 1}</td>
              <td className="is-hidden-desktop">{row.shortName}</td>
              <td className="is-hidden-touch">{row.name}</td>
              <td className="is-hidden-mobile">{row.played}</td>
              <td className="is-hidden-mobile">{row.win}</td>
              <td className="is-hidden-mobile">{row.loss}</td>
              <td className="is-hidden-mobile">{row.draw}</td>
              <td className="is-hidden-touch">{row.gf}</td>
              <td className="is-hidden-touch">{row.ga}</td>
              <td className="is-hidden-touch">{computeGD(row)}</td>
              <td>{computePoints(row)}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default LeagueTable;
