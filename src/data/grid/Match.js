export default class Match {

    constructor(match, teamId) {
        this.match = match;

        this.id = match.fixture.id;
        this.date = new Date(match.fixture.date);
        let options = { weekday: 'short', month: 'short', day: 'numeric' };
        this.dateStr = this.date.toLocaleString('en-US', options);

        this.homeId = match.teams.home.id;
        this.home = match.teams.home.name;
        this.homeLogo = match.teams.home.logo;
        this.homeScore = match.goals.home;
        
        this.awayId = match.teams.away.id;
        this.away = match.teams.away.name;
        this.awayLogo = match.teams.away.logo;
        this.awayScore = match.goals.away;

        if (teamId) {
            if (teamId == this.homeId) {
                this.win = match.goals.home > match.goals.away;
            } else {
                this.win = match.goals.home < match.goals.away;
            }
            this.draw = match.goals.home == match.goals.away;
        }
    }

}
