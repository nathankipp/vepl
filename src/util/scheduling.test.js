import { computeAllGames, buildSchedule } from './scheduling.js';

const ONE = ['A'];
const TWO = ['A', 'B'];
const THREE = ['A', 'B', 'C'];
const FOUR = ['A', 'B', 'C', 'D'];

describe('computeAllGames()', () => {
  it('is a noop with only 1 team', () => {
    expect(computeAllGames(ONE)).toEqual(['A']);
  });

  it('creates a home & away series for 2 teams', () => {
    expect(computeAllGames(TWO)).toEqual([
      ['A', 'B'],
      ['B', 'A'],
    ]);
  });

  it('creates a home & away for odd numbers of teams', () => {
    expect(computeAllGames(THREE)).toEqual([
      ['A', 'B'], ['A', 'C'],
      ['B', 'C'],
      ['B', 'A'], ['C', 'A'],
      ['C', 'B'],
    ]);
  });

  it('creates a home & away series for 4 teams', () => {
    expect(computeAllGames(FOUR)).toEqual([
      ['A', 'B'], ['A', 'C'], ['A', 'D'],
      ['B', 'C'], ['B', 'D'],
      ['C', 'D'],
      ['B', 'A'], ['C', 'A'], ['D', 'A'],
      ['C', 'B'], ['D', 'B'],
      ['D', 'C'],
    ]);
  });
});

describe('bulidSchedule()', () => {
  it('returns empty array for a 1 team league', () => {
    expect(buildSchedule(ONE)).toEqual([]);
  });

  fit('creates the right number of games per week', () => {
    [FOUR].forEach((teams, i) => {
      const matches = computeAllGames(teams);
      const weeks = buildSchedule(matches);
      const gamesPerWeek = [1, 1, 2];
      weeks.forEach(week => expect(week.length).toBe(gamesPerWeek[i]));
    });
  });
});
