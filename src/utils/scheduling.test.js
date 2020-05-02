import { scheduleMatches, getEligibleSeasons, buildResults } from './scheduling.js';

describe('scheduleMatches()', () => {
  it('returns empty array for any less than 2 teams', () => {
    expect(scheduleMatches()).toEqual([]);
    expect(scheduleMatches([])).toEqual([]);
    expect(scheduleMatches([1])).toEqual([]);
  });

  it('returns the right number of rounds', () => {
    const nine = 'acbdefghi';
    const ten = 'acbdefghij';
    const twenty = ten.split('').concat(ten.toUpperCase().split(''));
    expect(scheduleMatches(nine.split('')).length).toBe(18);
    expect(scheduleMatches(ten.split('')).length).toBe(18);
    expect(scheduleMatches(twenty).length).toBe(38);

  });

  it('never schedules the same team twice per week', () => {
    const schedule = scheduleMatches(['A', 'B', 'C', 'D']);
    schedule.forEach(week => {
      const teams = week[0].concat(week[1]).sort().join('');
      expect(teams).toBe('ABCD');
    });
  });

  it('schedules every fixture exactly once', () => {
    const twentyTeams = 'abcdefghijklmnopqrst'.split('');
    const schedule = scheduleMatches(twentyTeams);
    const fixtures = [];
    const allUnique = true;
    for (let i = 0; i < schedule.length; i += 1) {
      for (let j = 0; j < schedule[i].length; j += 1) {
        const fixture = schedule[i][j].join('');
        if (fixtures.includes(fixture)) {
          allUnique = false;
        }
        fixtures.push(fixture);
      }
    }
    expect(allUnique).toBe(true);
  });
});

describe('data prep', () => {
  const data = [
    {
      shortName: 'A',
      seasons: [2000, 2001],
      results: {
        '2000': { B: 'ab2k', C: 'ac2k' },
        '2001': { D: 'ad2k1', E: 'ae2k1' },
      },
    },{
      shortName: 'B',
      seasons: [2000, 2003],
      results: {
        '2000': { A: 'ba2k', C: 'bc2k' },
        '2003': { C: 'bc2k3', F: 'bf2k3' },
      }
    },{
      shortName: 'C',
      seasons: [2000, 2003],
      results: {
        '2000': { A: 'ca2k', B: 'cb2k' },
        '2003': { B: 'cb2k3', F: 'cf2k3' },
      }
    },{
      shortName: 'Z',
      seasons: [2004],
      results: {
        '2004': { Y: 'zy2k4', },
      }
    },
  ];

  describe('getEligibleSeasons()', () => {
    it('returns only seasons in which ALL teams played', () => {
      expect(getEligibleSeasons(data, ['A'])).toEqual([2000, 2001]);
      expect(getEligibleSeasons(data, ['B', 'C'])).toEqual([2000, 2003]);
      expect(getEligibleSeasons(data, ['A', 'B', 'C'])).toEqual([2000]);
      expect(getEligibleSeasons(data, ['A', 'B', 'C', 'Z'])).toEqual([]);
    });
  });

  describe('buildResults()', () => {
    it('returns an object of the shape { year: { homeShortNameAwayShortName: [result] }}}', () => {
      const years = [2000];
      expect(buildResults(data, years)).toMatchObject({
        '2000': {
          AB: 'ab2k',
          AC: 'ac2k',
          BA: 'ba2k',
          BC: 'bc2k',
          CA: 'ca2k',
          CB: 'cb2k',
        },
        '2001': {
          AD: 'ad2k1',
          AE: 'ae2k1',
        },
        '2003': {
          BC: 'bc2k3',
          BF: 'bf2k3',
          CB: 'cb2k3',
          CF: 'cf2k3'
        },
      });
    });
});
});
