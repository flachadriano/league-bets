export default class Match {

    constructor(match, teamId) {
        this.match = match;

        this.id = match.id;
        this.date = new Date(match.utcDate);
        let options = { weekday: 'short', month: 'short', day: 'numeric' };
        this.dateStr = this.date.toLocaleString('en-US', options);

        this.homeId = match.homeTeam.id;
        this.home = match.homeTeam.name;
        this.homeScore = match.score.fullTime.homeTeam;

        this.awayId = match.awayTeam.id;
        this.away = match.awayTeam.name;
        this.awayScore = match.score.fullTime.awayTeam;

        if (teamId) {
            if (teamId == this.homeId) {
                this.win = match.score.winner == 'HOME_TEAM';
            } else {
                this.win = match.score.winner == 'AWAY_TEAM';
            }
            this.draw = match.score.winner == 'DRAW';
        }
    }

}
