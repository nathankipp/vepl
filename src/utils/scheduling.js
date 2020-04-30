export function scheduleMatches(TEAMS) {
  let teams = Array.from(TEAMS);

  const home = [];
  const away = [];

  const start = !(teams.length % 2) ? 1 : 0;
  for (let week = 0; week < teams.length - 1; week += 1) {
    const last = teams.pop();
    teams.splice(start, 0, last);

    let matches = [];
    for (let i = 0; i < teams.length - 1; i += 2) {
      matches.push([teams[i], teams[i+1]]);
    }

    home.push(matches);
    away.push(matches.map(match => match.slice().reverse()));
  }

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
