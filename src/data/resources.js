import footballdbLeagues from './footballdb/Leagues';
import footballDataLeagues from './football-data/Leagues';
import apiFootballLeagues from './api-football/leagues';
import GridApiFootballLeagues from './grid-api-football/Leagues';
import GridFootballData from './grid-football-data/Leagues';

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

export default apis;
