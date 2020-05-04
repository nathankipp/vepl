export const computeGD = ({ gf, ga }) =>
  gf - ga;

export const computePoints = ({ win, draw }) =>
  (win * 3) + draw;

const resultType = ([a, b]) =>
  a > b ? 'win' : a < b ? 'loss' : 'draw';

export function incrementStats(venue) {
  return function fromFixture(fixture) {
    const score = venue === 'home'
      ? fixture.score
      : fixture.score.slice().reverse();
    const [gf, ga] = score;
    const wld = resultType(score);

    const team = fixture[venue];
    const { standings } = team;
    return !standings
      ? {
        shortName: team.shortName,
        name: team.name,
        played: 1,
        win: gf > ga ? 1 : 0,
        loss: gf < ga ? 1 : 0,
        draw: gf === ga ? 1 : 0,
        gf: gf,
        ga: ga,
      }
      : {
        played: standings.played + 1,
        [wld]: standings[wld] + 1,
        gf: standings.gf + gf,
        ga: standings.ga + ga
      };
  }
}

export function rankTeams(results) {
  return results.sort((a,b) => {
    const points = computePoints(b) - computePoints(a);
    const gd = computeGD(b) - computeGD(a);
    const gf = b.gf - a.gf;
    return points !== 0
    ? points
    : gd !== 0
    ? gd
    : gf;
  });
}
