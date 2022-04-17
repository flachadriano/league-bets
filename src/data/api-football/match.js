import BaseMatch from '../base-match';

export default class Match extends BaseMatch {
  constructor(data, club) {
    super(data.event_date,
      data.homeTeam.team_name, data.awayTeam.team_name,
      data.goalsHomeTeam, data.goalsAwayTeam);

    if (club) {
      this.home = data.homeTeam.team_name == club.name;
      this.teamScored = this.home ? data.goalsHomeTeam : data.goalsAwayTeam;
      this.teamAgainst = this.home ? data.goalsAwayTeam : data.goalsHomeTeam;

      const firstHalf = (data.score.halftime || '0-0').split('-');
      this.teamScoreFirstHalf = this.home ? firstHalf[0] : firstHalf[1];
      this.teamAgainstFirstHalf = this.home ? firstHalf[1] : firstHalf[0];

      this.teamScoreSecondHalf = this.teamScored - this.teamScoreFirstHalf;
      this.teamAgainstSecondHalf = this.teamAgainst - this.teamAgainstFirstHalf;

      this.win = this.teamScored > this.teamAgainst;
      this.draw = this.teamScored == this.teamAgainst;
      this.lose = this.teamScored < this.teamAgainst;
    }
  }
}
