/* eslint-disable jsx-a11y/anchor-is-valid */
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
    const away = homeAway.substr(3,3);
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

const LeagueTable = ({ teams, selectedTeams, iterations, isWorking, playSeries, results }) => {
  const hasPlayed = !!Object.keys(results).length;
  const standings = hasPlayed
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
      <div className="tabs is-toggle is-fullwidth">
        <ul>
          {['One Season', 'x 10', 'x 100'].map((iteration, i) => {
            const value = 10**i;
            const classes = isWorking ? ' is-loading' : '';
            const onClick = !isWorking
              ? () => playSeries(value)
              : () => {}
            return (
              <li key={iteration} className={iterations === value ? 'is-active' : ''}>
                <a className={`button${classes}`} onClick={onClick}>{iteration}</a>
              </li>
            );
          }
        )}
        </ul>
      </div>
      <table className="table is-fullwidth is-narrow">
        <thead>
          <tr>
            <th className="has-text-centered is-hidden-mobile">Pos</th>
            <th>Team</th>
            <th className="has-text-centered is-hidden-mobile">Pld</th>
            <th className="has-text-centered is-hidden-mobile">W</th>
            <th className="has-text-centered is-hidden-mobile">L</th>
            <th className="has-text-centered is-hidden-mobile">D</th>
            <th className="has-text-centered is-hidden-touch">GF</th>
            <th className="has-text-centered is-hidden-touch">GA</th>
            <th className="has-text-centered is-hidden-touch">GD</th>
            <th className="has-text-centered">Pts</th>
          </tr>
        </thead>
        <tbody>
        {
          standings.map((row, pos) => (
            <tr key={row.name}>
              <td className="has-text-centered is-hidden-mobile">{pos + 1}</td>
              <td className="has-text-centered is-hidden-desktop">{row.shortName}</td>
              <td className="is-hidden-touch">{row.name}</td>
              <td className="has-text-centered is-hidden-mobile">{row.played}</td>
              <td className="has-text-centered is-hidden-mobile">{row.win}</td>
              <td className="has-text-centered is-hidden-mobile">{row.loss}</td>
              <td className="has-text-centered is-hidden-mobile">{row.draw}</td>
              <td className="has-text-centered is-hidden-touch">{row.gf}</td>
              <td className="has-text-centered is-hidden-touch">{row.ga}</td>
              <td className="has-text-centered is-hidden-touch">{computeGD(row)}</td>
              <td className="has-text-centered">{computePoints(row)}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default LeagueTable;
