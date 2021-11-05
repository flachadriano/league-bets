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

        this.id = league.id;
        this.logo = league.logo;
        this.name = league.name;
        this.country = league.country;
    }

    currentRoundName() {
        const standingURL = `${URL}/standings?league=${this.id}&season=${SEASON}`;
        fetch(standingURL, HEADERS).then(r => r.json()).then(d => this.standing = d.response[0].league.standings[0]);

        const queries = [];

        const currentRoundURL = `${URL}/fixtures/rounds?league=${this.id}&season=${SEASON}&current=true`;
        queries.push(fetch(currentRoundURL, HEADERS).then(r => r.json()).then(d => this.currentRoundName = d.response[0]));

        const roundListNameURL = `${URL}/fixtures/rounds?league=${this.id}&season=${SEASON}`;
        queries.push(fetch(roundListNameURL, HEADERS).then(r => r.json()).then(d => this.roundListName = d.response));

        return Promise.all(queries).then(() => {
            const currentRoundIndex = this.roundListName.indexOf(this.currentRoundName);
            const nextRoundIndex = currentRoundIndex + 1;
            if (nextRoundIndex < this.roundListName.length) {
                this.nextRoundName = this.roundListName[nextRoundIndex];
            } else {
                this.nextRoundName = this.roundListName[this.roundListName.length - 1];
            }

            return this.currentRoundName;
        });
    }

    loadFixtures() {
        if (this.fixtures) {
            return Promise.resolve(this.fixtures);
        } else {
            const fixturesURL = `${URL}/fixtures?league=${this.id}&season=${SEASON}`;
            return fetch(fixturesURL, HEADERS).then(r => r.json()).then(d => this.fixtures = d.response);
        }
    }

    getRoundFixtures(fixtures, roundName) {
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

    currentRoundFixtures() {
        return this.loadFixtures().then(() => {
            this.nextRoundFixtures = this.getRoundFixtures(this.fixtures, this.nextRoundName);

            return this.getRoundFixtures(this.fixtures, this.currentRoundName);
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
        const fixtures = this.fixtures.filter(f => f.fixture.status.short == 'FT' && f.teams.away.id == teamId);
        let start = fixtures.length - quantity;
        if (start < 0) start = 0;
        return fixtures.slice(start).map(f => new Match(f, teamId));
    }

    teamStanding(teamId) {
        return this.standing.find(s => s.team.id == teamId);
    }

}
 