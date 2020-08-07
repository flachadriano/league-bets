import Vue from 'vue'
import Vuex from 'vuex'
import apis from './data/Apis'
import footballdbLeagues from './data/footballdb/Leagues'
import footballDataLeagues from './data/football-data/Leagues'
import { loadLeagueResources } from './data/League';
import { loadClubResources } from './data/Club';

Vue.use(Vuex);

const defaultLeague = {league: {key: 0}};

export default new Vuex.Store({
    state: {
        apis,
        api: apis.footballdb,
        leagues: footballdbLeagues,
        league: defaultLeague,
        clubs: [],
        club: {},
    },
    getters: {
        apis: state => state.apis,
        api: state => state.api,
        leagues: state => state.leagues,
        league: state => state.league,
        leagueId: state => state.league.league.key,
        clubs: state => state.clubs,
        club: state => state.club,
        hasSelectedClub: state => Object.keys(state.club).length > 0
    },
    mutations: {
        changeApi: (state, apiEl) => {
            const api = apiEl.target.value;
            state.api = api;

            if (api == apis.footballdb) {
                state.leagues = footballdbLeagues;
            } else {
                state.leagues = footballDataLeagues;
            }

            state.league = defaultLeague;
            state.club = {};
        },
        changeLeague: (state, leagueEl) => {
            const league = leagueEl.target.value;
            const foundLeague = state.leagues.find(l => l.key == league);
            const loadedLeague = loadLeagueResources(state.api, foundLeague);
            loadedLeague.loadClubs().then(clubs => state.clubs = clubs);
            state.league = loadedLeague;
            state.club = {};
        },
        selectClub: (state, club) => {
            console.log(club);
            if (typeof club == 'object' && club.name) {
                const loadedClub = loadClubResources(state.api, state.league, club);
                state.club = loadedClub;
            } else {
                state.club = {};
            }
        }
    }
});