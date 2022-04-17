import BaseMatch from '../base-match';

export default class Match extends BaseMatch {
  constructor(match, club) {
    super(match.utcDate,
      match.homeTeam.name, match.awayTeam.name,
      match.score.fullTime.homeTeam, match.score.fullTime.awayTeam);

    this.data = match;

    this.draw = this.score1 == this.score2;

    if (club) {
      this.home = this.data.homeTeam.name == club.name;

      const fullTime = this.data.score.fullTime;
      this.teamScored = this.home ? fullTime.homeTeam : fullTime.awayTeam;
      this.teamAgainst = this.home ? fullTime.awayTeam : fullTime.homeTeam;

      const firstHalf = this.data.score.halfTime;
      this.teamScoreFirstHalf = this.home ? firstHalf.homeTeam : firstHalf.awayTeam;
      this.teamAgainstFirstHalf = this.home ? firstHalf.awayTeam : firstHalf.homeTeam;

      this.teamScoreSecondHalf = this.teamScored - this.teamScoreFirstHalf;
      this.teamAgainstSecondHalf = this.teamAgainst - this.teamAgainstFirstHalf;

      this.win = this.teamScored > this.teamAgainst;
      this.lose = this.teamScored < this.teamAgainst;
    }
  }

  home(club) {
    return this.data.homeTeam.name == club.name;
  }

  has(club) {
    const home = this.home(club);
    const away = this.data.awayTeam.name == club.name;
    return home || away;
  }

  played() {
    return this.data.status == 'FINISHED';
  }

  win(club) {
    if (this.home(club)) {
      return this.score1 > this.score2;
    } else {
      return this.score1 < this.score2;
    }
  }

  scored(club) {
    if (this.home(club)) {
      return this.data.score.fullTime.homeTeam;
    } else {
      return this.data.score.fullTime.awayTeam;
    }
  }

  against(club) {
    if (this.home(club)) {
      return this.data.score.fullTime.awayTeam;
    } else {
      return this.data.score.fullTime.homeTeam;
    }
  }

  goals() {
    return this.data.score.fullTime.homeTeam +
            this.data.score.fullTime.awayTeam;
  }
}
