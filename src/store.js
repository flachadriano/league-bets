import Vue from 'vue'
import Vuex from 'vuex'
import { apis, loadLeagues, loadLeagueResources, loadClubResources } from './data/resources'
import BaseLeague from './data/BaseLeague';

Vue.use(Vuex);

const defaultLeague = {league: {key: 0}};

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
        changeLeague: (state, leagueEl) => {
            const league = leagueEl.target.value;
            const foundLeague = state.leagues.find(l => l.key == league);
            const loadedLeague = loadLeagueResources(state.api, foundLeague);

            state.league = loadedLeague;
            state.clubs = [];
            state.club = {};
            state.compareClub = {};

            state.loadingClubs = true;
            loadedLeague.loadMatches()
                .then(matches => state.matches = matches)
                .then(() => loadedLeague.loadClubs())
                .then(clubs => BaseLeague.validateClubs(clubs))
                .then(clubs => clubs.map(club => loadClubResources(state.api, state.league, club, clubs, state.matches)))
                .then(clubs => clubs.sort((a, b) => a.nextMatch().dateObj - b.nextMatch().dateObj))
                .then(clubs => state.clubs = clubs)
                .then(() => state.loadingClubs = false);
        },
        selectGridLeague: (state, league) => {
            state.league = loadLeagueResources(state.api, league);
        },
        closeLeague: (state) => {
            state.league = {};
        },
        selectClub: (state, club) => {
            if (typeof club == 'object' && club.name) {
                state.club = club;
            } else {
                state.club = {};
            }
            state.compareClub = {};
        },
        selectCompareClub: (state, clubName) => {
            if (typeof clubName == 'string' && clubName) {
                const club = state.clubs.find(c => c.name == clubName);
                state.compareClub = club;
            } else {
                state.compareClub = {};
            }
        },
        selectFixture: (state, fixture) => {
            state.fixture = fixture;
        },
    }
});
