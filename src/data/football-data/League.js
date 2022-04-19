import { URL, HEADERS } from './Resources';
import BaseLeague from '../_base/BaseLeague';
import Match from './Match';

export default class League extends BaseLeague {
  async loadClubs() {
    return fetch(`${URL}/${this.league.clubsUrl}`, HEADERS)
      .then(r => r.json()).then(data => data.standings[0].table)
      .then(t => t.map(c => ({ ...c, id: c.team.id, name: c.team.name })));
  }

  async loadMatches() {
    return fetch(`${URL}/${this.league.matchesUrl}`, HEADERS)
      .then(r => r.json()).then(data => data.matches);
  }

  clubStanding(club) {
    return this.standing.find(s => s.team.name == club.name);
  }

  clubMatches(club) {
    return this.matches.filter(match => new Match(match).has(club));
  }

  standingBy(field, club, ascending = false) {
    const ascendingSort = (a, b) => a[field] - b[field];
    const descendingSort = (a, b) => b[field] - a[field];
    const sortBy = ascending ? ascendingSort : descendingSort;

    return this.standing.sort(sortBy)
      .map(position => position.team.name)
      .indexOf(club.name) + 1;
  }
}
