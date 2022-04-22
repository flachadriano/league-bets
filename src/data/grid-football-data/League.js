import Cache from '../Cache';
import BaseLeague from '../_base/BaseLeague';
import { URL, HEADERS } from './Resources';
import Match from './Match';

export default class League extends BaseLeague {
  /**
     * roundListName
     * fixtures
     * currentRoundName
     * currentRoundFixtures
     */

  /**
     *
     * @param {Object} league - { id, logo, name, country: {} }
     */
  constructor(league) {
    super(league);

    this.id = league.id;
    this.logo = league.logo;
    this.name = league.name;
    this.country = { flag: league.country.flag };
    this.currentRound = league.currentRound;
    this.currentRoundTitle = league.currentRoundTitle;
  }

  async currentRoundFixtures() {
    const loadStanding = () => {
      const standingURL = `${URL}/competitions/${this.id}/standings`;
      return Cache.get(standingURL, HEADERS).then(data => this.standing = data.standings[0].table);
    };

    const loadMatches = () => {
      const getTeamLogo = (teamId) => {
        const stand = this.standing.find(stand => stand.team.id == teamId);
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

      const nextRoundURL = `${URL}/competitions/${this.id}/matches`;
      return Cache.get(nextRoundURL, HEADERS).then(data => this.fixtures = data.matches.map(m => new Match(setMatchLogo(m))));
    };

    await loadStanding();
    await loadMatches();
    return Promise.resolve(this.fixtures.filter(m => m.round == this.currentRound));
  }
}
