import { URL } from './Resources';
import Match from './Match';

export default class Club {
  constructor(league, club) {
    this.league = league;
    this.club = club;

    this.name = this.club.name;
  }

  async position() {
    const teams = await this.processClubs('points');
    return teams.map(t => t.code).indexOf(this.club.code) + 1;
  }

  async winInLast6() {
    const matches = await this.loadMatches();
    const last6matches = matches.slice(0, 6);
    const wonMatches = last6matches.filter(m => new Match(m).win(this.club));
    return wonMatches.length;
  }

  async scored() {
    const matches = await this.loadMatches();
    return matches.reduce((acc, match) => acc + new Match(match).clubScored(this.club), 0);
  }

  async scoredPerMatch() {
    const matches = await this.loadMatches();
    const scored = await this.scored();
    return (scored / matches.length).toFixed(2);
  }

  async rankedScore() {
    const teams = await this.processClubs('goalsFor');
    return teams.map(t => t.code).indexOf(this.club.code) + 1;
  }

  async against() {
    const matches = await this.loadMatches();
    return matches.reduce((acc, match) => acc + new Match(match).clubAgainst(this.club), 0);
  }

  async againstPerMatch() {
    const matches = await this.loadMatches();
    const against = await this.against();
    return (against / matches.length).toFixed(2);
  }

  async rankedAgainst() {
    const teams = await this.processClubs('against');
    return teams.map(t => t.code).indexOf(this.club.code) + 1;
  }

  async topScored() {
    const matches = await this.loadMatches();
    const goalsInMatch = matches.map(m => new Match(m).clubScored(this.club));
    return Math.max(...goalsInMatch);
  }

  async topScoredMatch() {
    const matches = await this.loadMatches();
    const goalsInMatch = matches.map(m => new Match(m).goals());
    return Math.max(...goalsInMatch);
  }

  async loadMatches(allClubs = false, played = true) {
    const url = `${URL}/${this.league.year}/${this.league.matches}`;
    const rounds = await fetch(url).then(r => r.json()).then(data => data.rounds);
    const allMatches = rounds.reduce((acc, round) => acc.concat(round.matches), []);
    let allPlayedMatches = allMatches;
    if (played) {
      allPlayedMatches = allPlayedMatches.filter(m => new Match(m).played()).reverse();
    }
    if (allClubs) {
      return allPlayedMatches;
    } else {
      return allPlayedMatches.filter(m => new Match(m).club(this.club));
    }
  }

  async nextMatch() {
    const matches = await this.loadMatches(false, false);
    console.log(matches);
    const upcomingMatches = matches.filter(m => !new Match(m).played());
    console.log(upcomingMatches);
    if (upcomingMatches.length > 0) {
      const match = upcomingMatches[0];
      return {
        ...match,
        home: new Match(match).clubIsHome(this.club)
      };
    } else {
      return {
        team1: '--',
        team2: '--'
      };
    }
  }

  async lastMatches() {
    const matches = await this.loadMatches();
    return matches.slice(0, 6).map(m => {
      return ({
        ...m,
        home: new Match(m).clubIsHome(this.club),
        win: new Match(m).win(this.club),
        draw: new Match(m).draw()
      });
    });
  }

  async processClubs(orderBy) {
    const clubs = await this.league.loadClubs();
    const matches = await this.loadMatches(true);

    let processedClubs = clubs.map(club => {
      let win = 0; let draw = 0; let lose = 0; let goalsFor = 0; let goalsAgainst = 0; let points = 0; let games = 0;

      const clubMatches = matches.filter(match => new Match(match).played(club));
      clubMatches.forEach(m => {
        const match = new Match(m);

        if (match.draw()) {
          draw++;
        } else if (match.win(club)) {
          win++;
        } else {
          lose++;
        }

        games++;
        goalsFor += match.clubScored(club);
        goalsAgainst += match.clubAgainst(club);
      });

      points = (win * 3) + draw;
      return Object.assign(club, { win, draw, lose, goalsFor, goalsAgainst, points, games });
    });

    if (orderBy) {
      processedClubs = processedClubs.sort((a, b) => {
        const x = a[orderBy]; const y = b[orderBy];
        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });
    }

    return processedClubs;
  }
}
