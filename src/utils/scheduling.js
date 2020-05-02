export function scheduleMatches(teams = []) {
  if (teams.length < 2) {
    return [];
  }

  const home = [];
  const away = [];

  const rounds = teams.length % 2 === 0
    ? teams.length - 1
    : teams.length;

  let rotateTeams = Array.from(teams);
  for (let i = 0; i < rounds; i += 1) {
    const rotation = Array.from(rotateTeams);

    let matches = [];
    while (rotation.length > 1) {
      const first = rotation.shift();
      const last = rotation.pop();
      matches.push([first, last]);
    }

    const last = rotateTeams.pop();
    rotateTeams.splice((teams.length + 1) % 2, 0, last);

    home.push(matches);
    away.push(matches.map(match => match.slice().reverse()));
  };

  return home.concat(away);
}

export function getEligibleSeasons(data, selectedTeams) {
  let activeSeasons = [];

  data
    .filter(team => selectedTeams.includes(team.shortName))
    .forEach(team => {
      if (activeSeasons.length === 0) {
        activeSeasons = team.seasons;
      } else {
        activeSeasons = activeSeasons.filter(season => team.seasons.includes(season));
      }
    });

  return activeSeasons;
}

export function buildResults(data, years) {
  return data.reduce((acc, team) => {
    const home = team.shortName;

    for (let year in team.results) {
      year = String(year);
      if (!acc[year]) {
        acc[year] = {};
      }
      for (const away in team.results[year]) {
        acc[year][`${home}${away}`] = team.results[year][away];
      }
    }

    return acc;
  }, {});
}
