import footballDataLeagues from './football-data/Leagues';
import GridFootballData from './grid-football-data/Leagues';

export const SEASON = 2021;

export const apis = {
  footballData: 'football-data',
  footballdb: 'footballdb',
  gridFootballData: 'gridFootballData',
};

export function loadLeagues(api) {
  switch (api) {
    case apis.footballData:
      return footballDataLeagues;
    case apis.gridFootballData:
      return new GridFootballData();
  }
}

export default apis;
