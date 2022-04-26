import footballdbLeagues from './footballdb/Leagues';
import footballDataLeagues from './football-data/Leagues';
import GridApiFootball from './grid-api-football/Leagues';
import GridFootballData from './grid-football-data/Leagues';

export const SEASON = 2021;

export const apis = {
  footballData: 'football-data',
  footballdb: 'footballdb',
  gridApiFootball: 'gridApiFootball',
  gridFootballData: 'gridFootballData',
};

export function loadLeagues(api) {
  switch (api) {
    case apis.footballdb:
      return footballdbLeagues;
    case apis.footballData:
      return footballDataLeagues;
    case apis.grid:
      return new GridApiFootball();
    case apis.gridFootballData:
      return new GridFootballData();
  }
}

export default apis;
