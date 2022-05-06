export default class MatchBuilder {
  constructor() {
    this.data = {};
  }

  id(id) {
    this.data.id = id;
    return this;
  }

  played(played) {
    this.data.played = played;
    return this;
  }

  dateStr(dateStr) {
    this.data.dateStr = dateStr;
    return this;
  }

  round(round) {
    this.data.round = round;
    return this;
  }

  homeId(homeId) {
    this.data.homeId = homeId;
    return this;
  }

  home(home) {
    this.data.home = home;
    return this;
  }

  homeLogo(homeLogo) {
    this.data.homeLogo = homeLogo;
    return this;
  }

  homeScore(homeScore) {
    this.data.homeScore = homeScore;
    return this;
  }

  awayId(awayId) {
    this.data.awayId = awayId;
    return this;
  }

  away(away) {
    this.data.away = away;
    return this;
  }

  awayLogo(awayLogo) {
    this.data.awayLogo = awayLogo;
    return this;
  }

  awayScore(awayScore) {
    this.data.awayScore = awayScore;
    return this;
  }

  build() {
    return this.data;
  }
}
