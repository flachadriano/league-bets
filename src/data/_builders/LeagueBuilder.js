export default class LeagueBuilder {
  constructor() {
    this.data = {};
  }

  id(id) {
    this.data.id = id;
    return this;
  }

  logo(logo) {
    this.data.logo = logo;
    return this;
  }

  name(name) {
    this.data.name = name;
    return this;
  }

  countryFlag(flag) {
    this.data.country = { flag };
    return this;
  }

  currentRound(currentRound) {
    this.data.currentRound = currentRound;
    this.data.currentRoundTitle = `Round ${this.data.currentRound}`;
    return this;
  }

  currentRoundFixtures(currentRoundFixturesFn) {
    this.data.currentRoundFixtures = currentRoundFixturesFn;
    return this;
  }

  loadStanding(loadStandingFn) {
    this.data.loadStanding = loadStandingFn;
    return this;
  }

  loadMatches(loadMatchesFn) {
    this.data.loadMatches = loadMatchesFn;
    return this;
  }

  build() {
    return this.data;
  }
}
