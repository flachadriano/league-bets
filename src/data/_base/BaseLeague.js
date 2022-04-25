export default class BaseLeague {
  constructor(league, standing, teams, matches) {
    this.league = league;
    this.data = league;
    this.standing = standing || [];
    this.teams = teams;
    this.matches = matches || [];

    this.id = league.id;
    this.logo = league.logo;
    this.name = league.name;
    this.country = { flag: league.country.flag };
    this.currentRound = league.currentRound;
    this.currentRoundTitle = league.currentRoundTitle;
    this.loadStanding = league.loadStanding;
    this.loadMatches = league.loadMatches;
  }

  async currentRoundFixtures() {
    console.log('loading');
    this.standing = await this.loadStanding();
    console.log('loading', this.standing);
    this.fixtures = await this.loadMatches(this.standing);
    console.log('loading', this.fixtures);
    console.log(this.currentRound);
    return Promise.resolve(this.fixtures.filter(m => m.round == this.currentRound));
  }

  lastMatches(teamId, quantity = 6) {
    return this.fixtures
      .filter(m => m.homeId == teamId || m.awayId == teamId)
      .splice(0, quantity)
      .map(m => m.validateResult(teamId));
  }

  lastHomeMatches(teamId, quantity = 6) {
    return this.fixtures
      .filter(m => m.homeId == teamId)
      .splice(0, quantity)
      .map(m => m.validateResult(teamId));
  }

  lastAwayMatches(teamId, quantity = 6) {
    return this.fixtures
      .filter(m => m.awayId == teamId)
      .splice(0, quantity)
      .map(m => m.validateResult(teamId));
  }

  loadPreviousFixture() {
    this.currentRound -= 1;
    this.currentRoundTitle = `Round ${this.currentRound}`;
  }

  loadNextFixture() {
    this.currentRound += 1;
    this.currentRoundTitle = `Round ${this.currentRound}`;
  }

  teamStanding(teamId) {
    const stand = this.standing.find(stand => stand.team.id == teamId);

    const homeStanding = () => {
      const homeMatches = this.lastHomeMatches(teamId);
      return {
        played: homeMatches.length,
        win: homeMatches.filter(m => m.win).length,
        draw: homeMatches.filter(m => m.draw).length,
        lose: homeMatches.filter(m => m.lose).length,
        goals: {
          for: homeMatches.map(m => m.homeScore || 0).reduce((a, b) => a + b, 0),
          against: homeMatches.map(m => m.awayScore || 0).reduce((a, b) => a + b, 0),
        },
      };
    };

    const awayStanding = () => {
      const awayMatches = this.lastAwayMatches(teamId);
      return {
        played: awayMatches.length,
        win: awayMatches.filter(m => m.win).length,
        draw: awayMatches.filter(m => m.draw).length,
        lose: awayMatches.filter(m => m.lose).length,
        goals: {
          for: awayMatches.map(m => m.awayScore || 0).reduce((a, b) => a + b, 0),
          against: awayMatches.map(m => m.homeScore || 0).reduce((a, b) => a + b, 0),
        },
      };
    };

    return {
      rank: stand.position,
      points: stand.points,
      all: {
        played: stand.playedGames,
        win: stand.won,
        draw: stand.draw,
        lose: stand.lost,
        goals: {
          for: stand.goalsFor,
          against: stand.goalsAgainst
        }
      },
      home: homeStanding(),
      away: awayStanding(),
    };
  }
}
