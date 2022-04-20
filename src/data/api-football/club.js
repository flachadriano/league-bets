import BaseClub from '../_base/BaseClub';
import Match from './match';

export default class Club extends BaseClub {
  position() {
    return this.club.rank;
  }

  scored() {
    return this.club.all.goalsFor;
  }

  scoredPerMatch() {
    return (this.scored() / this.club.all.matchsPlayed).toFixed(2);
  }

  rankedScore() {
    const goalsFor = this.league.map(club => club.all.goalsFor).sort((a, b) => b - a);
    return goalsFor.indexOf(this.scored()) + 1;
  }

  against() {
    return this.club.all.goalsAgainst;
  }

  againstPerMatch() {
    return (this.against() / this.club.all.matchsPlayed).toFixed(2);
  }

  rankedAgainst() {
    const goalsAgainst = this.league.map(club => club.all.goalsAgainst).sort((a, b) => a - b);
    return goalsAgainst.indexOf(this.against()) + 1;
  }

  clubMatches(status = 'Match Finished') {
    return this.matches
      .filter(m => m.awayTeam.team_id == this.club.team_id ||
                            m.homeTeam.team_id == this.club.team_id)
      .filter(m => m.status == status);
  }

  nextMatch() {
    const nextMatch = this.clubMatches('Not Started')[0];
    if (nextMatch) {
      return new Match(nextMatch);
    } else {
      return {};
    }
  }

  lastMatches() {
    const lastMatches = this.clubMatches().reverse().splice(0, 6);
    if (lastMatches.length > 0) {
      return lastMatches.map(m => new Match(m, this.data));
    } else {
      return [];
    }
  }
}
