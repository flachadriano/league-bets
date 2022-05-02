export default class StandingItemBuilder {
  constructor() {
    this.data = {};
  }

  position(position) {
    this.data.position = position;
    return this;
  }

  teamId(teamId) {
    this.data.teamId = teamId;
    return this;
  }

  name(name) {
    this.data.name = name;
    return this;
  }

  logo(logo) {
    this.data.logo = logo;
    return this;
  }

  played(played) {
    this.data.played = played;
    return this;
  }

  points(points) {
    this.data.points = points;
    return this;
  }

  won(won) {
    this.data.won = won;
    return this;
  }

  draw(draw) {
    this.data.draw = draw;
    return this;
  }

  lost(lost) {
    this.data.lost = lost;
    return this;
  }

  goalsFor(goalsFor) {
    this.data.goalsFor = goalsFor;
    return this;
  }

  goalsAgainst(goalsAgainst) {
    this.data.goalsAgainst = goalsAgainst;
    return this;
  }

  build() {
    return this.data;
  }
}
