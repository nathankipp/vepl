import { scheduleMatches } from './scheduling.js';

describe('scheduleMatches()', () => {
  it('schedules 2 x (n - 1) weeks of games', () => {
    expect(scheduleMatches(new Array(2)).length).toBe(2);
    expect(scheduleMatches(new Array(3)).length).toBe(4);
    expect(scheduleMatches(new Array(20)).length).toBe(38);
  });

  it('never schedules the same team twice per week', () => {
    const schedule = scheduleMatches(['A', 'B', 'C', 'D']);
    schedule.forEach(week => {
      const teams = week[0].concat(week[1]).sort().join('');
      expect(teams).toBe('ABCD');
    });
  });

  it('schedules every fixture exactly once', () => {
    const schedule = scheduleMatches(['A', 'B', 'C', 'D']);
    const fixtures = [
      // A home
      'A,B', 'A,D', 'A,C',
      'D,C', 'C,B', 'B,D',
      // A away
      'B,A', 'D,A', 'C,A',
      'C,D', 'B,C', 'D,B',
    ];
    const occurrences = fixtures.map(fixture =>
      schedule.find(matches =>
        matches[0].toString() === fixture ||
        matches[1].toString() === fixture
      )
        ? true
        : false
    );

    occurrences.forEach(once => expect(once).toBe(true));
  });
});
