import Vue from 'vue';
import Vuex from 'vuex';
import {
  apis,
  loadLeagues,
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
    fixture: {},
  },
  getters: {
    apis: state => state.apis,
    api: state => state.api,
    leagues: state => state.leagues,
    league: state => state.league,
    fixture: state => state.fixture,
    hasSelectedLeague: state => state.league.id > 0,
    hasFixture: state => Object.keys(state.fixture).length > 0,
    currentRound: state => state.league?.currentRound,
    currentRoundTitle: state => state.league?.currentRoundTitle,
  },
  mutations: {
    changeApi: (state, apiEl) => {
      state.api = apiEl.target.value;
      loadLeagues(state.api).loadLeagues().then(leagues => state.leagues = leagues);
      state.league = {};
      state.fixture = {};
    },
    selectLeague: (state, league) => {
      state.league = state.leagues.find(l => l.id == league.id);
      state.fixture = {};
    },
    closeLeague: (state) => {
      state.league = {};
      state.fixture = {};
    },
    selectFixture: (state, fixture) => {
      state.fixture = fixture;
    },
    previousRound: (state) => {
      state.league.loadPreviousFixture();
      state.fixture = {};
    },
    nextRound: (state) => {
      state.league.loadNextFixture();
      state.fixture = {};
    }
  }
});
