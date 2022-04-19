import BaseLeague from '../_base/BaseLeague';
import { URL, HEADERS } from './Resources';
import Match from './Match';

export default class League extends BaseLeague {
  /**
     * roundListName
     * fixtures
     * currentRoundName
     * currentRoundFixtures
     * nextRoundName
     * nextRoundFixtures
     */

  /**
     *
     * @param {Object} league - { id, logo, name, country: {} }
     */
  constructor(league) {
    super(league);

    this.id = league.id;
    this.logo = league.emblemUrl || league.area.ensignUrl;
    this.name = league.name;
    this.country = { flag: league.area.ensignUrl };
    this.currentRound = this.league.currentSeason.currentMatchday;
    this.nextRoundName = `Round ${this.currentRound + 1}`;
  }

  currentRoundName() {
    return `Round ${this.currentRound}`;
  }

  async currentRoundFixtures() {
    const loadStanding = () => {
      const standingURL = `${URL}/competitions/${this.id}/standings`;
      return fetch(standingURL, HEADERS).then(r => r.json())
        .then(data => this.standing = data.standings[0].table);
    };

    const loadRound = (roundId) => {
      const getTeamLogo = (teamId) => {
        const stand = this.standing.find(stand => stand.team.id == teamId);
        return stand.team.crestUrl;
      };

      const setMatchLogo = (match) => {
        return {
          ...match,
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

      const nextRoundURL = `${URL}/competitions/${this.id}/matches?matchday=${roundId}`;
      return fetch(nextRoundURL, HEADERS).then(r => r.json())
        .then(data => data.matches.map(m => setMatchLogo(m)));
    };

    const loadMatches = () => {
      const nextRoundURL = `${URL}/competitions/${this.id}/matches`;
      return fetch(nextRoundURL, HEADERS).then(r => r.json())
        .then(data => this.fixtures = data.matches.map(m => new Match(m)));
    };

    await loadMatches();
    await loadStanding();
    await loadRound(this.currentRound + 1).then(matches => this.nextRoundFixtures = matches.map(match => new Match(match)));
    return loadRound(this.currentRound).then(matches => matches.map(match => new Match(match)));
  }

  teamStanding(teamId) {
    const stand = this.standing.find(stand => stand.team.id == teamId);

    const homeStanding = () => {
      const homeMatches = this.lastHomeMatches(teamId);
      return {
        played: homeMatches.length,
        win: homeMatches.filter(m => m.win).length,
        draw: homeMatches.filter(m => m.draw).length,
        lose: homeMatches.filter(m => m.lose).length,
        goals: {
          for: homeMatches.map(m => m.homeScore || 0).reduce((a, b) => a + b, 0),
          against: homeMatches.map(m => m.awayScore || 0).reduce((a, b) => a + b, 0),
        },
      };
    };

    const awayStanding = () => {
      const awayMatches = this.lastAwayMatches(teamId);
      return {
        played: awayMatches.length,
        win: awayMatches.filter(m => m.win).length,
        draw: awayMatches.filter(m => m.draw).length,
        lose: awayMatches.filter(m => m.lose).length,
        goals: {
          for: awayMatches.map(m => m.awayScore || 0).reduce((a, b) => a + b, 0),
          against: awayMatches.map(m => m.homeScore || 0).reduce((a, b) => a + b, 0),
        },
      };
    };

    return {
      rank: stand.position,
      points: stand.points,
      all: {
        played: stand.playedGames,
        win: stand.won,
        draw: stand.draw,
        lose: stand.lost,
        goals: {
          for: stand.goalsFor,
          against: stand.goalsAgainst
        }
      },
      home: homeStanding(),
      away: awayStanding(),
    };
  }

  lastMatches(teamId, quantity = 6) {
    return this.fixtures
      .filter(m => m.homeId == teamId || m.awayId == teamId)
      .splice(0, quantity)
      .map(m => m.validateResult(teamId));
  }

  lastHomeMatches(teamId, quantity = 6) {
    return this.fixtures
      .filter(m => m.homeId == teamId)
      .splice(0, quantity)
      .map(m => m.validateResult(teamId));
  }

  lastAwayMatches(teamId, quantity = 6) {
    return this.fixtures
      .filter(m => m.awayId == teamId)
      .splice(0, quantity)
      .map(m => m.validateResult(teamId));
  }
}
