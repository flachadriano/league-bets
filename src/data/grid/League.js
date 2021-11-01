import BaseLeague from '../BaseLeague';
import { URL, HEADERS } from './Resources';
import { SEASON } from '../resources';
import Match from '../grid/Match';

export default class League extends BaseLeague {

    /**
     * roundListName
     * fixtures
     * currentRoundName
     * currentRoundFixtures
     * nextRoundName
     * nextRoundFixtures
     */

    constructor(league) {
        super(league);

        const queries = [];

        const roundListNameURL = `${URL}/fixtures/rounds?league=${league.id}&season=${SEASON}`;
        queries.push(fetch(roundListNameURL, HEADERS).then(r => r.json()).then(d => this.roundListName = d.response));

        const currentRoundURL = `${URL}/fixtures/rounds?league=${league.id}&season=${SEASON}&current=true`;
        queries.push(fetch(currentRoundURL, HEADERS).then(r => r.json()).then(d => this.currentRoundName = d.response[0]));

        const fixturesURL = `${URL}/fixtures?league=${league.id}&season=${SEASON}`;
        queries.push(fetch(fixturesURL, HEADERS).then(r => r.json()).then(d => this.fixtures = d.response));

        const standingURL = `${URL}/standings?league=${league.id}&season=${SEASON}`;
        queries.push(fetch(standingURL, HEADERS).then(r => r.json()).then(d => this.standing = d.response[0].league.standings[0]));

        const getRoundFixtures = (fixtures, roundName) => {
            return fixtures.filter(fixture => fixture.league.round == roundName)
                .map(f => new Match(f)).sort((a, b) => {
                    if (a.date < b.date) {
                        return -1;
                    }
                    if (a.date > b.date) {
                        return 1;
                    }
                    return 0;
                });
        }

        Promise.all(queries).then(() => {
            this.currentRoundFixtures = getRoundFixtures(this.fixtures, this.currentRoundName);

            // next round
            const currentRoundIndex = this.roundListName.indexOf(this.currentRoundName);
            const nextRoundIndex = currentRoundIndex + 1;
            if (nextRoundIndex < this.roundListName.length) {
                this.nextRoundName = this.roundListName[nextRoundIndex];
                this.nextRoundFixtures = getRoundFixtures(this.fixtures, this.nextRoundName);
            }
        });
    }

    lastMatches(teamId, quantity = 5) {
        const fixtures = this.fixtures.filter(f => f.fixture.status.short == 'FT' &&
                (f.teams.away.id == teamId || f.teams.home.id == teamId));
        let start = fixtures.length - quantity;
        if (start < 0) start = 0;
        return fixtures.slice(start).map(f => new Match(f, teamId));
    }

    lastHomeMatches(teamId, quantity = 5) {
        const fixtures = this.fixtures.filter(f => f.fixture.status.short == 'FT' && f.teams.home.id == teamId);
        let start = fixtures.length - quantity;
        if (start < 0) start = 0;
        return fixtures.slice(start).map(f => new Match(f, teamId));
    }

    lastAwayMatches(teamId, quantity = 5) {
        const fixtures = this.fixtures.filter(f => f.fixture.status.short == 'FT' && f.teams.away.id);
        let start = fixtures.length - quantity;
        if (start < 0) start = 0;
        return fixtures.slice(start).map(f => new Match(f, teamId));
    }

    teamStanding(teamId) {
        return this.standing.find(s => s.team.id == teamId);
    }

}
 