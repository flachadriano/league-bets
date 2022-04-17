import footballdbLeagues from './footballdb/Leagues';
import footballDataLeagues from './football-data/Leagues';
import apiFootballLeagues from './api-football/leagues';
import GridApiFootballLeagues from './grid-api-football/Leagues';
import GridFootballData from './grid-football-data/Leagues';

import FootballDbLeague from './footballdb/League';
import FootballDataLeague from './football-data/League';
import ApiFootballLeague from './api-football/league';
import GridApiFootballLeague from './grid-api-football/League';
import GridFootballDataLeague from './grid-football-data/League';

import FootballDbClub from './footballdb/Club';
import FootballDataClub from './football-data/Club';
import ApiFootballClub from './api-football/club';

export const SEASON = 2021;

export const apis = {
  // footballdb: 'footballdb',
  footballData: 'football-data',
  apifootball: 'api-football',
  grid: 'grid',
  gridFootballData: 'gridFootballData',
};

export function loadLeagues(api) {
  switch (api) {
    case apis.footballdb:
      return footballdbLeagues;
    case apis.footballData:
      return footballDataLeagues;
    case apis.apifootball:
      return apiFootballLeagues;
    case apis.grid:
      return new GridApiFootballLeagues();
    case apis.gridFootballData:
      return new GridFootballData();
  }
}

export function loadLeagueResources(api, league) {
  if (league) {
    switch (api) {
      case apis.footballdb:
        return new FootballDbLeague(league);
      case apis.footballData:
        return new FootballDataLeague(league);
      case apis.apifootball:
        return new ApiFootballLeague(league);
      case apis.grid:
        return new GridApiFootballLeague(league);
      case apis.gridFootballData:
        return new GridFootballDataLeague(league);
      default:
        alert('No API found');
    }
  }
}

export function loadClubResources(api, leagueObj, club, clubs, matches) {
  if (leagueObj && club) {
    switch (api) {
      case apis.footballdb:
        return new FootballDbClub(leagueObj, club);
      case apis.footballData:
        return new FootballDataClub(club, clubs, matches);
      case apis.apifootball:
        return new ApiFootballClub(club, clubs, matches);
      default:
        alert('No API found');
    }
  }
}

export default apis;
