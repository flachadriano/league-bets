export default class BaseLeague {

    constructor(league, standing, teams, matches) {
        this.league = league;
        this.data = league;
        this.standing = standing || [];
        this.teams = teams;
        this.matches = matches || [];
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

}