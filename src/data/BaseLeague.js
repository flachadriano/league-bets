export default class BaseLeague {

    constructor(league, standing, teams, matches) {
        this.league = league;
        this.data = league;
        this.standing = standing || [];
        this.teams = teams;
        this.matches = matches || [];

        this.currentRound = 'Not implemented';
        this.nextRoundName = 'Not implemented';
    }

    static validateClubs(clubs) {
        if (!Array.isArray(clubs)) {
            console.error('clubs should be an array of club');
        } else {
            for (const club of clubs) {
                if (!club.id || !club.name) {
                    console.error('clubs should have club with id and name attributes');
                }
            }
        }
        return clubs;
    }

    async loadClubs() {
        console.error('loadClubs not implemented.');
        return new Promise(resolve => resolve([]));
    }

    currentRoundName() {
        console.error('currentRoundName not implemented.');
        return 'Not implemented';
    }

    currentRoundFixtures() {
        console.error('currentRoundFixtures not implemented.');
        return [];
    }

    teamStanding() {
        console.error('teamStanding not implemented.');
        return {};
    }

    lastHomeMatches() {
        console.error('lastHomeMatches not implemented.');
        return [];
    }

    lastAwayMatches() {
        console.error('lastAwayMatches not implemented.');
        return [];
    }

    lastMatches() {
        console.error('lastMatches not implemented.');
        return [];
    }

}