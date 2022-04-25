import Cache from '../Cache';
import { URL, HEADERS } from './Resources';
import BaseGridLeague from '../_base/BaseGridLeague';
import LeagueBuilder from '../_builders/LeagueBuilder';
import MatchBuilder from '../_builders/MatchBuilder';
import BaseLeague from '../_base/BaseLeague';
import BaseMatch from '../_base/BaseMatch';

export default class Leagues extends BaseGridLeague {
  createMatchBuilder(match, standing) {
    const getTeamLogo = (teamId) => {
      const stand = standing.find(stand => stand.team.id == teamId);
      return stand.team.crestUrl;
    };

    return new MatchBuilder()
      .dateStr(match.utcDate)
      .round(match.matchday)
      .homeId(match.homeTeam.id)
      .home(match.homeTeam.name)
      .homeLogo(getTeamLogo(match.homeTeam.id))
      .homeScore(match.score.fullTime.homeTeam)
      .awayId(match.awayTeam.id)
      .awayLogo(getTeamLogo(match.awayTeam.id))
      .awayScore(match.score.fullTime.awayTeam)
      .build();
  }

  createLeagueBuilder(league) {
    return new LeagueBuilder()
      .id(league.id)
      .logo(league.emblemUrl)
      .name(league.name)
      .countryFlag(league.area.ensignUrl)
      .currentRound(league.currentSeason.currentMatchday)
      .loadStanding(async () => {
        const standingURL = `${URL}/competitions/${league.code}/standings`;
        return Cache.get(standingURL, HEADERS).then(data => data.standings[0].table);
      }).loadMatches(async (standing) => {
        const nextRoundURL = `${URL}/competitions/${league.code}/matches`;
        return Cache.get(nextRoundURL, HEADERS).then(data => data.matches.map(m => new BaseMatch(this.createMatchBuilder(m, standing))));
      }).build();
  }

  async loadLeagues() {
    return await Cache.get(`${URL}/competitions`, HEADERS)
      .then(data => data.competitions)
      .then(leagues => leagues.filter(league => ['BL1', 'DED', 'BSA', 'PD', 'FL1', 'PPL', 'SA', 'PL'].indexOf(league.code) >= 0))
      .then(leagues => leagues.map(league => new BaseLeague(this.createLeagueBuilder(league))));
  }
}
