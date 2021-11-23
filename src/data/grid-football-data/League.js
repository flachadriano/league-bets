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

    async currentRoundFixtures() {
        const loadStanding = () => {
            const standingURL = `${URL}/competitions/${this.id}/standings`;
            return fetch(standingURL, HEADERS).then(r => r.json())
                .then(data => this.standing = data.standings[0].table);
        }
    
        const loadRound = (roundId) => {
            const nextRoundURL = `${URL}/competitions/${this.id}/matches?matchday=${roundId}`;
            return fetch(nextRoundURL, HEADERS).then(r => r.json());
        }

        await loadStanding();
        await loadRound(this.currentRound + 1).then(data => this.nextRoundFixtures = data.matches.map(match => new Match(match)));
        return loadRound(this.currentRound).then(data => data.matches.map(match => new Match(match)));
    }

    teamStanding(teamId) {
        console.log(this.standing);
        const team = this.standing.find(stand => stand.team.id = teamId);
        console.log(team);
        return {
            rank: team.position,
            points: team.points,
            all: {
                played: team.playedGames,
                win: team.won,
                draw: team.draw,
                lose: team.lost,
                goals: {
                    for: team.goalsFor,
                    against: team.goalsAgainst
                }
            },
            home: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } },
            away: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } }
        };
    }

}
 