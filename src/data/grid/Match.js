export default class Match {

    constructor(match) {
        this.match = match;

        this.id = match.fixture.id;
        this.date = new Date(match.fixture.date);
        let options = { weekday: 'short', month: 'short', day: 'numeric' };
        this.dateStr = this.date.toLocaleString('en-US', options);
        
        this.home = match.teams.home.name;
        this.homeLogo = match.teams.home.logo;
        this.homeScore = match.goals.home;
        
        this.away = match.teams.away.name;
        this.awayLogo = match.teams.away.logo;
        this.awayScore = match.goals.away;
    }

}
