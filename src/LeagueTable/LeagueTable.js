import React from 'react';

const computeGD = ({ gf, ga }) => gf - ga;
const computePoints = ({ win, draw }) => (win * 3) + draw;

const resultType = (a, b) =>
  a > b ? 'win' : a < b ? 'loss' : 'draw';

function computeStandings(results, teams) {
  const teamName = teams.reduce((acc, curr) =>  {
    acc[curr.shortName] = curr.name;
    return acc;
  }, {});

  const standings = [];
  Object.keys(results).forEach(fixture => {
    const home = fixture.substr(0,3);
    const away = fixture.substr(3);
    const score = {
      home: results[fixture].result[0],
      away: results[fixture].result[1],
    };

    const homeTally = standings.find(({ shortName }) => shortName === home);
    if (!homeTally) {
      standings.push({
        shortName: home,
        name: teamName[home],
        played: 1,
        win: score.home > score.away ? 1 : 0,
        loss: score.home < score.away ? 1 : 0,
        draw: score.home === score.away ? 1 : 0,
        gf: score.home,
        ga: score.away,
      });
    } else {
      homeTally.played += 1;
      homeTally[resultType(score.home, score.away)] += 1;
      homeTally.gf += score.home;
      homeTally.ga += score.away;
    }

    const awayTally = standings.find(({ shortName }) => shortName === away);
    if (!awayTally) {
      standings.push({
        shortName: away,
        name: teamName[away],
        played: 1,
        win: score.away > score.home ? 1 : 0,
        loss: score.away < score.home ? 1 : 0,
        draw: score.away === score.home ? 1 : 0,
        gf: score.away,
        ga: score.home,
      });
    } else {
      awayTally.played += 1;
      awayTally[resultType(score.away, score.home)] += 1;
      awayTally.gf += score.away;
      awayTally.ga += score.home;
    }
  });

  console.log(standings);
  return standings.sort((a,b) =>
    computePoints(b) - computePoints(a)
  );
}

const LeagueTable = ({ teams, results }) => {
  const standings = computeStandings(results, teams);
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
