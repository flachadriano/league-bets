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
    league: defaultLeague,
    compareClub: {},
    fixture: {},
    currentRound: 0,
    currentRoundTitle: 'Round 0'
  },
  getters: {
    apis: state => state.apis,
    api: state => state.api,
    leagues: state => state.leagues,
    league: state => state.league,
    leagueId: state => state.league?.league?.key,
    fixture: state => state.fixture,
    compareClub: state => state.compareClub,
    hasSelectedLeague: state => Object.keys(state.league).length > 0,
    hasFixture: state => Object.keys(state.fixture).length > 0,
    currentRound: state => state.league?.currentRound,
    currentRoundTitle: state => state.league?.currentRoundTitle,
  },
  mutations: {
    changeApi: (state, apiEl) => {
      const api = apiEl.target.value;
      state.api = api;

      loadLeagues(state.api).loadLeagues().then(leagues => state.leagues = leagues);
      state.league = {};
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
