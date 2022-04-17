import BaseLeague from '../BaseLeague';
import { URL, HEADERS } from './resources';

export default class League extends BaseLeague {
  async loadClubs() {
    return fetch(`${URL}/${this.data.clubsUrl}`, HEADERS)
      .then(r => r.json()).then(d => d.api.standings.reduce((acc, s) => acc.concat(s), []))
      .then(s => s.map(c => ({ ...c, id: c.team_id, name: c.teamName })))
      .then(s => s.reduce((acc, c) => {
        if (!acc.find(c2 => c2.team_id == c.team_id)) {
          acc.push(c);
        }
        return acc;
      }, []));
  }

  async loadMatches() {
    return fetch(`${URL}/${this.data.matchesUrl}`, HEADERS)
      .then(r => r.json()).then(d => d.api.fixtures);
  }
}
