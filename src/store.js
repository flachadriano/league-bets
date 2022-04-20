import Vue from 'vue';
import Vuex from 'vuex';
import {
  apis,
  loadLeagues,
  loadLeagueResources,
} from './data/resources';

Vue.use(Vuex);

const defaultLeague = {
  league: {
    key: 0
  }
};

export default new Vuex.Store({
  state: {
    apis,
    api: [],
    leagues: [],
    leaguesList: [],
    league: defaultLeague,
    loadingClubs: false,
    clubs: [],
    club: {},
    compareClub: {},
    fixture: {},
    currentRound: 0,
    currentRoundTitle: 'Round 0'
  },
  getters: {
    apis: state => state.apis,
    api: state => state.api,
    isGridApi: state => state.api && state.api.toString().startsWith('grid'),
    leagues: state => state.leagues,
    leaguesList: state => state.leaguesList,
    league: state => state.league,
    leagueId: state => state.league?.league?.key,
    loadingClubs: state => state.loadingClubs,
    clubs: state => state.clubs,
    club: state => state.club,
    fixture: state => state.fixture,
    compareClub: state => state.compareClub,
    hasSelectedLeague: state => Object.keys(state.league).length > 0,
    hasSelectedClub: state => Object.keys(state.club).length > 0,
    hasFixture: state => Object.keys(state.fixture).length > 0,
    currentRound: state => state.league?.currentRound,
    currentRoundTitle: state => state.league?.currentRoundTitle,
  },
  mutations: {
    changeApi: (state, apiEl) => {
      const api = apiEl.target.value;
      state.api = api;
      state.clubs = [];
      state.club = {};
      state.compareClub = {};

      if (api.startsWith('grid')) {
        loadLeagues(state.api).loadLeagues().then(leagues => state.leagues = leagues);
        state.league = {};
      } else {
        state.leagues = loadLeagues(api);
        state.league = defaultLeague;
      }
    },
    selectGridLeague: (state, league) => {
      state.league = loadLeagueResources(state.api, league);
    },
    closeLeague: (state) => {
      state.league = {};
    },
    selectFixture: (state, fixture) => {
      state.fixture = fixture;
    },
    previousRound: (state) => {
      state.league.loadPreviousFixture();
    },
    nextRound: (state) => {
      state.league.loadNextFixture();
    }
  }
});
