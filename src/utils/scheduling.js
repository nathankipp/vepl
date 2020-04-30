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
