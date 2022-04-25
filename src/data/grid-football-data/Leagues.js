import Cache from '../Cache';
import BaseGridLeague from '../_base/BaseGridLeague';
import { URL, HEADERS } from './Resources';
import LeagueBuilder from '../_builders/LeagueBuilder';
import BaseLeague from '../_base/BaseLeague';
import Match from './Match';

export default class Leagues extends BaseGridLeague {
  createBuilder(league) {
    return new LeagueBuilder()
      .id(league.id)
      .logo(league.emblemUrl)
      .name(league.name)
      .countryFlag(league.area.ensignUrl)
      .currentRound(league.currentSeason.currentMatchday)
      .loadStanding(async () => {
        console.log('loadStanding');
        const standingURL = `${URL}/competitions/${league.code}/standings`;
        return Cache.get(standingURL, HEADERS).then(data => data.standings[0].table);
      }).loadMatches(async (standing) => {
        console.log('loadMatches');
        const getTeamLogo = (teamId) => {
          const stand = standing.find(stand => stand.team.id == teamId);
          return stand.team.crestUrl;
        };

        const setMatchLogo = (match) => {
          return {
            ...match,
            round: match.matchday,
            homeTeam: {
              ...match.homeTeam,
              logo: getTeamLogo(match.homeTeam.id),
            },
            awayTeam: {
              ...match.awayTeam,
              logo: getTeamLogo(match.awayTeam.id),
            }
          };
        };

        const nextRoundURL = `${URL}/competitions/${league.code}/matches`;
        return Cache.get(nextRoundURL, HEADERS).then(data => data.matches.map(m => new Match(setMatchLogo(m))));
      }).build();
  }

  async loadLeagues() {
    return await Cache.get(`${URL}/competitions`, HEADERS)
      .then(data => data.competitions)
      .then(leagues => leagues.filter(league => ['BL1', 'DED', 'BSA', 'PD', 'FL1', 'PPL', 'SA', 'PL'].indexOf(league.code) >= 0))
      .then(leagues => leagues.map(league => new BaseLeague(this.createBuilder(league))));
  }
}
