export default class BaseLeague {
  constructor(data) {
    Object.keys(data).forEach(k => this[k] = data[k]);
  }

  async currentRoundFixtures() {
    this.standing = await this.loadStanding();
    this.fixtures = await this.loadMatches(this.standing);
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

    const homeAwayStanding = (home) => {
      let matches = this.lastHomeMatches(teamId);
      if (!home) {
        matches = this.lastAwayMatches(teamId);
      }
      return {
        played: matches.length,
        win: matches.filter(m => m.win).length,
        draw: matches.filter(m => m.draw).length,
        lose: matches.filter(m => m.lose).length,
        btts: matches.filter(m => m.homeScore > 0 && m.awayScore > 0).length,
        goals: {
          for: matches.map(m => (home ? m.homeScore : m.awayScore) || 0).reduce((a, b) => a + b, 0),
          against: matches.map(m => (home ? m.awayScore : m.homeScore) || 0).reduce((a, b) => a + b, 0),
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
        btts: this.fixtures.filter(m => m.homeId == teamId || m.awayId == teamId).filter(m => m.homeScore > 0 && m.awayScore > 0).length,
        goals: {
          for: stand.goalsFor,
          against: stand.goalsAgainst
        }
      },
      home: homeAwayStanding(this.lastHomeMatches.bind(this)),
      away: homeAwayStanding(this.lastAwayMatches.bind(this)),
    };
  }
}
