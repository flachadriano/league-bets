export default class Match {
  constructor(match) {
    this.match = match;
  }

  club(club) {
    const home = this.clubIsHome(club);
    const visitor = this.match.team2 == club.name;
    return home || visitor;
  }

  clubIsHome(club) {
    return this.match.team1 == club.name;
  }

  clubScored(club) {
    const isHome = this.club(club);
    if (isHome) {
      return this.match.score.ft[0];
    } else {
      return this.match.score.ft[1];
    }
  }

  clubAgainst(club) {
    const isHome = this.club(club);
    if (isHome) {
      return this.match.score.ft[1];
    } else {
      return this.match.score.ft[0];
    }
  }

  win(club) {
    const home = this.clubIsHome(club);
    if (home) {
      return this.match.score.ft[0] > this.match.score.ft[1];
    } else {
      return this.match.score.ft[1] > this.match.score.ft[0];
    }
  }

  draw() {
    return this.match.score.ft[0] == this.match.score.ft[1];
  }

  played(club) {
    const past = !!this.match.score;
    if (club) {
      return past && this.club(club);
    } else {
      return past;
    }
  }

  goals() {
    if (this.played()) {
      const score = this.match.score.ft;
      return score[0] + score[1];
    } else {
      return 0;
    }
  }
}
