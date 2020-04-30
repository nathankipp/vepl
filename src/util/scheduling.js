const scheduleGames = (teams) => {
  const matches = [];
  for (let i = 0; i < teams.length - 1; i += 1) {
    matches.push([teams[0], teams[i + 1]]);
  }
  teams.shift();
  return teams.length < 2
    ? matches
    : matches.concat(scheduleGames(teams));
}

export function computeAllGames(teams) {
  if (teams.length < 2) {
    return teams;
  }

  const home = scheduleGames(teams);
  const away = home.map(
    match => match.slice().reverse()
  );

  return home.concat(away);
}


const getIndex = (matchesLeft, teamsHavePlayed) =>
  matchesLeft.findIndex(match => !teamsHavePlayed.includes(match));

const weekOfGames = (matches) => {
  const gamesThisWeek = [];
  let matchesLeft = Array.from(matches);
  let teamsHavePlayed = [];

  let gameIndex = getIndex(matchesLeft, teamsHavePlayed);
  while (gameIndex > -1) {
    const game = matchesLeft.splice(gameIndex, 1)[0];
    gamesThisWeek.push(game);
    teamsHavePlayed = teamsHavePlayed.concat(game);
    gameIndex = getIndex(matchesLeft, teamsHavePlayed);
    console.log(gameIndex)
  }

  return {
    gamesThisWeek,
    matchesLeft: matches
  };
}

export function buildSchedule(matches) {
  if (matches.length < 2) {
    return [];
  }

  let matchesLeft = Array.from(matches);
  let gamesThisWeek;

  const schedule = [];
  do {
    ({ gamesThisWeek, matchesLeft } = weekOfGames(matches));
    schedule.push([gamesThisWeek]);
  } while(false);

  schedule.forEach(week => console.log(week));
  return schedule;
}
