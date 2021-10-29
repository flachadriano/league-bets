export default class Match {

    constructor(match) {
        this.match = match;

        this.id = match.fixture.id;
        this.home = match.teams.home.name;
        this.homeLogo = match.teams.home.logo;
        this.away = match.teams.away.name;
        this.awayLogo = match.teams.away.logo;
    }

}
