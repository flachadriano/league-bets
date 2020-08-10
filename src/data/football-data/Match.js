import BaseMatch from '../base-match';

export default class Match extends BaseMatch {

    constructor(match, club) {
        super(match.utcDate,
            match.homeTeam.name, match.awayTeam.name,
            match.score.fullTime.homeTeam, match.score.fullTime.awayTeam)

        this.data = match;

        this.draw = this.score1 == this.score2;

        if (club) {
            if (this.home(club)) {
                this.teamScoreFirstHalf = this.data.score.halfTime.homeTeam;
                this.teamAgainstFirstHalf = this.data.score.halfTime.awayTeam;
            } else {
                this.teamScoreFirstHalf = this.data.score.halfTime.awayTeam;
                this.teamAgainstFirstHalf = this.data.score.halfTime.homeTeam;
            }

            this.teamScored = this.scored(club);
            this.teamAgainst = this.against(club);
            this.matchGoals = this.goals();
        }
    }

    home(club) {
        return this.data.homeTeam.name == club.name;
    }

    has(club) {
        const home = this.home(club);
        const away = this.data.awayTeam.name == club.name;
        return home || away;
    }

    played() {
        return this.data.status == 'FINISHED';
    }

    win(club) {
        if (this.home(club)) {
            return this.score1 > this.score2;
        } else {
            return this.score1 < this.score2;
        }
    }

    scored(club) {
        if (this.home(club)) {
            return this.data.score.fullTime.homeTeam;
        } else {
            return this.data.score.fullTime.awayTeam;
        }
    }

    against(club) {
        if (this.home(club)) {
            return this.data.score.fullTime.awayTeam;
        } else {
            return this.data.score.fullTime.homeTeam;
        }
    }

    goals() {
        return this.data.score.fullTime.homeTeam
            + this.data.score.fullTime.awayTeam;
    }

}