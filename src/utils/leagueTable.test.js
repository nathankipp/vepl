import {
  computeGD,
  computePoints,
  rankTeams,
  incrementStats,
} from './leagueTable';

describe('leagueTable utils', () => {
  const getFixture = score => ({
    home: {
      shortName: 'a',
      name: 'aa',
      standings: undefined,
    },
    away: {
      shortName: 'b',
      name: 'bb',
      standings: undefined,
    },
    score,
  });

  describe('computeGD()', () => {
    it('returns the goal difference', () => {
      const pos = { gf: 5, ga: 3 };
      const neg = { gf: 3, ga: 5 };
      expect(computeGD(pos)).toBe(2);
      expect(computeGD(neg)).toBe(-2);
    });
  });

  describe('computePoints()', () => {
    it('gives 3pts for a win', () => {
      const data = { win: 1, draw: 0, loss: 0 };
      expect(computePoints(data)).toBe(3);
    });
    it('gives 1pt for a draw', () => {
      const data = { win: 0, draw: 1, loss: 0 };
      expect(computePoints(data)).toBe(1);
    });
    it('gives 0pts for a loss', () => {
      const data = { win: 0, draw: 0, loss: 1 };
      expect(computePoints(data)).toBe(0);
    });
    it('sums up the points', () => {
      const data = { win: 3, draw: 2, loss: 1 };
      expect(computePoints(data)).toBe(11);
    });
  });

  describe('rankTeams()', () => {
    it('sorts first by most points', () => {
      const data = [
        { win: 1, draw: 0 },
        { win: 3, draw: 0 },
        { win: 2, draw: 0 },
      ];
      expect(rankTeams(data)).toMatchObject([
          { win: 3, draw: 0 },
          { win: 2, draw: 0 },
          { win: 1, draw: 0 },
      ]);
    });

    it('sorts second by goal difference', () => {
      const gaWinDraw = { ga: 0, win: 0, draw: 0 };
      const data = [
        { gf: 1, ...gaWinDraw },
        { gf: 3, ...gaWinDraw },
        { gf: 2, ...gaWinDraw },
      ];
      expect(rankTeams(data)).toMatchObject([
          { gf: 3 },
          { gf: 2 },
          { gf: 1 },
      ]);
    });

    it('sorts third by goals for', () => {
      const winDraw = { win: 0, draw: 0 };
      const data = [
        { gf: 1, ga: 1, ...winDraw },
        { gf: 3, ga: 3, ...winDraw },
        { gf: 2, ga: 2, ...winDraw },
      ];
      expect(rankTeams(data)).toMatchObject([
          { gf: 3 },
          { gf: 2 },
          { gf: 1 },
      ]);
    });
  });

  describe('incrementStats()', () => {
    it('returns a function', () => {
      expect(typeof incrementStats()).toBe('function');
    });

    describe('for the first match in a series', () => {
      it('returns entries for a drawn first match', () => {
        const fixture = getFixture([0,0]);
        expect(incrementStats('home')(fixture)).toEqual({
          shortName: 'a',
          name: 'aa',
          played: 1,
          win: 0,
          loss: 0,
          draw: 1,
          gf: 0,
          ga: 0,
        });
        expect(incrementStats('away')(fixture)).toEqual({
          shortName: 'b',
          name: 'bb',
          played: 1,
          win: 0,
          loss: 0,
          draw: 1,
          gf: 0,
          ga: 0,
        });
      });

      it('returns entries for a first match where a beats b', () => {
        const fixture = getFixture([2,1]);
        expect(incrementStats('home')(fixture)).toEqual({
          shortName: 'a',
          name: 'aa',
          played: 1,
          win: 1,
          loss: 0,
          draw: 0,
          gf: 2,
          ga: 1,
        });
        expect(incrementStats('away')(fixture)).toEqual({
          shortName: 'b',
          name: 'bb',
          played: 1,
          win: 0,
          loss: 1,
          draw: 0,
          gf: 1,
          ga: 2,
        });
      });

      it('returns entries for a first match where b beats a', () => {
        const fixture = getFixture([1,2]);
        expect(incrementStats('home')(fixture)).toEqual({
          shortName: 'a',
          name: 'aa',
          played: 1,
          win: 0,
          loss: 1,
          draw: 0,
          gf: 1,
          ga: 2,
        });
        expect(incrementStats('away')(fixture)).toEqual({
          shortName: 'b',
          name: 'bb',
          played: 1,
          win: 1,
          loss: 0,
          draw: 0,
          gf: 2,
          ga: 1,
        });
      });
    });

    describe('for subsequent matches', () => {
      it('increments played, win, gf & ga correctly', () => {
        const fixture = getFixture([2,1]);
        const standings = {
          played: 1,
          win: 0,
          loss: 0,
          gf: 0,
          ga: 0,
        };
        fixture.home.standings = { ...standings };
        fixture.away.standings = { ...standings };
        expect(incrementStats('home')(fixture)).toMatchObject({
          played: 2,
          win: 1,
          gf: 2,
          ga: 1,
        });
        expect(incrementStats('away')(fixture)).toMatchObject({
          played: 2,
          loss: 1,
          gf: 1,
          ga: 2,
        });
      });

      it('increments draws correctly', () => {
        const fixture = getFixture([2,2]);
        const standings = {
          played: 1,
          draw: 0,
          gf: 0,
          ga: 0,
        };
        fixture.home.standings = { ...standings };
        fixture.away.standings = { ...standings };
        expect(incrementStats('home')(fixture)).toMatchObject({
          played: 2,
          draw: 1,
          gf: 2,
          ga: 2,
        });
        expect(incrementStats('away')(fixture)).toMatchObject({
          played: 2,
          draw: 1,
          gf: 2,
          ga: 2,
        });
      });
    });
  });
});
