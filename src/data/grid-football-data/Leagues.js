import Cache from '../Cache';
import { URL, HEADERS } from './Resources';
import BaseGridLeague from '../_base/BaseGridLeague';
import LeagueBuilder from '../_builders/LeagueBuilder';
import MatchBuilder from '../_builders/MatchBuilder';
import StandingBuilder from '../_builders/StandingBuilder';
import StandingItemBuilder from '../_builders/StandingItemBuilder';
import BaseLeague from '../_base/BaseLeague';
import BaseMatch from '../_base/BaseMatch';
import BaseStanding from '../_base/BaseStanding';

export default class Leagues extends BaseGridLeague {
  createMatchBuilder(match, standing) {
    const getTeamLogo = (teamName) => standing.table.find(stand => stand.name == teamName).logo;
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', hour12: false, minute: 'numeric' };

    return new MatchBuilder()
      .id(match.id)
      .played(match.status != 'SCHEDULED')
      .dateStr(new Date(match.utcDate).toLocaleString('en-US', options))
      .round(match.matchday)
      .homeId(match.homeTeam.id)
      .home(match.homeTeam.name)
      .homeLogo(getTeamLogo(match.homeTeam.name))
      .homeScore(match.score.fullTime.homeTeam)
      .awayId(match.awayTeam.id)
      .away(match.awayTeam.name)
      .awayLogo(getTeamLogo(match.awayTeam.name))
      .awayScore(match.score.fullTime.awayTeam)
      .build();
  }

  createStandingBuilder(standing) {
    const builder = new StandingBuilder();
    standing.forEach(item => builder.item(new StandingItemBuilder()
      .position(item.position)
      .teamId(item.team.id)
      .name(item.team.name)
      .logo(item.team.crestUrl)
      .played(item.playedGames)
      .points(item.points)
      .won(item.won)
      .draw(item.draw)
      .lost(item.lost)
      .goalsFor(item.goalsFor)
      .goalsAgainst(item.goalsAgainst)
      .build()));
    return builder.build();
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
        return Cache.get(standingURL, HEADERS).then(data => new BaseStanding(this.createStandingBuilder(data.standings[0].table)));
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
