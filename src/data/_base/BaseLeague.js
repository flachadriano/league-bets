export default class BaseLeague {
  constructor(league, standing, teams, matches) {
    this.league = league;
    this.data = league;
    this.standing = standing || [];
    this.teams = teams;
    this.matches = matches || [];

    this.currentRound = 'Not implemented';
    this.nextRoundName = 'Not implemented';
  }

  static validateClubs(clubs) {
    if (!Array.isArray(clubs)) {
      console.error('clubs should be an array of club');
    } else {
      for (const club of clubs) {
        if (!club.id || !club.name) {
          console.error('clubs should have club with id and name attributes');
        }
      }
    }
    return clubs;
  }

  async loadClubs() {
    console.error('loadClubs not implemented.');
    return new Promise(resolve => resolve([]));
  }

  currentRoundName() {
    console.error('currentRoundName not implemented.');
    return 'Not implemented';
  }

  currentRoundFixtures() {
    console.error('currentRoundFixtures not implemented.');
    return [];
  }

  teamStanding() {
    console.error('teamStanding not implemented.');
    return {
      rank: 0,
      points: 0,
      all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } },
      home: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } },
      away: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } }
    };
  }

  lastHomeMatches() {
    console.error('lastHomeMatches not implemented.');
    return [];
  }

  lastAwayMatches() {
    console.error('lastAwayMatches not implemented.');
    return [];
  }

  lastMatches() {
    console.error('lastMatches not implemented.');
    return [];
  }

  loadPreviousFixture() {
    this.currentRound -= 1;
    this.currentRoundTitle = `Round ${this.currentRound}`;
  }

  loadNextFixture() {
    this.currentRound += 1;
    this.currentRoundTitle = `Round ${this.currentRound}`;
  }
}
