import BaseLeague from '../BaseLeague';
import { URL, HEADERS } from './Resources';
import Match from './Match';

export default class League extends BaseLeague {

    /**
     * roundListName
     * fixtures
     * currentRoundName
     * currentRoundFixtures
     * nextRoundName
     * nextRoundFixtures
     */

    /**
     * 
     * @param {Object} league - { id, logo, name, country: {} } 
     */
    constructor(league) {
        super(league);

        this.id = league.id;
        this.logo = league.logo;
        this.name = league.name;
        this.country = league.country;
        this.currentRound = new Number(this.league.currentSeason.currentMatchday);
        this.nextRoundName = `Round ${this.currentRound + 1}`;
    }

    currentRoundName() {
        return `Round ${this.currentRound}`;
    }

    currentRoundFixtures() {
        this.loadStanding();

        const nextRoundURL = `${URL}/competitions/${this.id}/matches?matchday=${this.currentRound+1}`;
        fetch(nextRoundURL, HEADERS).then(r => r.json())
            .then(data => this.nextRoundFixtures = data.matches.map(match => new Match(match)));

        const currentRoundURL = `${URL}/competitions/${this.id}/matches?matchday=${this.currentRound}`;
        return fetch(currentRoundURL, HEADERS).then(r => r.json())
            .then(data => data.matches.map(match => new Match(match)));
    }

    loadStanding() {
        const standingURL = `${URL}/competitions/${this.id}/standings`;
        fetch(standingURL, HEADERS).then(r => r.json())
            .then(data => this.standing = data.standings[0]);
    }

    teamStanding() {
        return this.standing;
    }

}
 