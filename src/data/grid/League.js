import BaseLeague from '../BaseLeague';
import { URL, HEADERS } from './Resources';
import { SEASON } from '../resources';
import Match from '../grid/Match';

export default class League extends BaseLeague {

    constructor(league) {
        super(league);

        const queries = [];

        const roundListNameURL = `${URL}/fixtures/rounds?league=${league.id}&season=${SEASON}`;
        queries.push(fetch(roundListNameURL, HEADERS).then(r => r.json()).then(d => this.roundListName = d.response[0]));

        const currentRoundURL = `${URL}/fixtures/rounds?league=${league.id}&season=${SEASON}&current=true`;
        queries.push(fetch(currentRoundURL, HEADERS).then(r => r.json()).then(d => this.currentRoundName = d.response[0]));

        const fixturesURL = `${URL}/fixtures?league=${league.id}&season=${SEASON}`;
        queries.push(fetch(fixturesURL, HEADERS).then(r => r.json()).then(d => this.fixtures = d.response));

        Promise.all(queries).then(() => {
            this.currentRoundFixtures = this.fixtures.filter(fixture => fixture.league.round == this.currentRoundName).map(f => new Match(f)).sort((a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            });
        });
    }

}
 