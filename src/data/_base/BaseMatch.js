export default class BaseMatch {
  constructor(data) {
    Object.keys(data).forEach(k => this[k] = data[k]);
  }

  validateResult(teamId) {
    this.draw = this.homeScore == this.awayScore;
    if (teamId == this.homeId) {
      this.won = this.homeScore > this.awayScore;
      this.lost = this.homeScore < this.awayScore;
    } else {
      this.won = this.homeScore < this.awayScore;
      this.lost = this.homeScore > this.awayScore;
    }
    return this;
  };
}
