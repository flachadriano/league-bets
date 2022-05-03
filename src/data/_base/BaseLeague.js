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
    const stand = this.standing.table.find(stand => stand.teamId == teamId);

    const homeAwayStanding = (home) => {
      let matches = this.lastHomeMatches(teamId);
      if (!home) {
        matches = this.lastAwayMatches(teamId);
      }
      return {
        played: matches.length,
        won: matches.filter(m => m.won).length,
        draw: matches.filter(m => m.draw).length,
        lost: matches.filter(m => m.lost).length,
        btts: matches.filter(m => m.homeScore > 0 && m.awayScore > 0).length,
        goalsFor: matches.map(m => (home ? m.homeScore : m.awayScore) || 0).reduce((a, b) => a + b, 0),
        goalsAgainst: matches.map(m => (home ? m.awayScore : m.homeScore) || 0).reduce((a, b) => a + b, 0),
      };
    };

    return {
      rank: stand.position,
      points: stand.points,
      all: {
        played: stand.played,
        won: stand.won,
        draw: stand.draw,
        lost: stand.lost,
        btts: this.fixtures.filter(m => m.homeId == teamId || m.awayId == teamId).filter(m => m.homeScore > 0 && m.awayScore > 0).length,
        goalsFor: stand.goalsFor,
        goalsAgainst: stand.goalsAgainst,
      },
      home: homeAwayStanding(true),
      away: homeAwayStanding(false),
    };
  }
}
