import BaseClub from '../_base/BaseClub';
import Match from './Match';

export default class Club extends BaseClub {
  position() {
    return this.data.position;
  }

  scored() {
    return this.data.goalsFor;
  }

  scoredPerMatch() {
    return (this.scored() / this.data.playedGames).toFixed(2);
  }

  rankedScore() {
    return this.league.map(c => c.goalsFor).sort((a, b) => b - a).indexOf(this.data.goalsFor) + 1;
  }

  against() {
    return this.data.goalsAgainst;
  }

  againstPerMatch() {
    return (this.against() / this.data.playedGames).toFixed(2);
  }

  rankedAgainst() {
    return this.league.map(c => c.goalsAgainst).sort((a, b) => a - b).indexOf(this.data.goalsAgainst) + 1;
  }

  clubsMatches(played = true) {
    return this.matches
      .filter(m => m.awayTeam.name == this.data.name ||
                        m.homeTeam.name == this.data.name)
      .filter(m => (!played && m.status == 'SCHEDULED') ||
                        (played && m.status == 'FINISHED'));
  }

  nextMatch() {
    const nextMatches = this.clubsMatches(false);
    if (nextMatches.length > 0) {
      return new Match(nextMatches[0]);
    } else {
      return { team1: '--', team2: '--' };
    }
  }

  lastMatches(quantity) {
    const playedMatches = this.clubsMatches(true);
    if (playedMatches.length > 0) {
      return playedMatches.reverse().slice(0, quantity).map(m => new Match(m, this.data));
    } else {
      return [];
    }
  }
}
