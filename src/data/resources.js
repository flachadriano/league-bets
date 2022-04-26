import GridFootballData from './grid-football-data/Leagues';

export const apis = {
  gridFootballData: 'gridFootballData',
};

export function loadLeagues(api) {
  switch (api) {
    case apis.gridFootballData:
      return new GridFootballData();
  }
}

export default apis;
