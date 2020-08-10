import footballdbLeagues from './footballdb/Leagues'
import footballDataLeagues from './football-data/Leagues'
import apiFootballLeagues from './api-football/leagues';

import FootballDbLeague from './footballdb/League';
import FootballDataLeague from './football-data/League';
import ApiFootballLeague from './api-football/league';

import FootballDbClub from './footballdb/Club';
import FootballDataClub from './football-data/Club';
import ApiFootballClub from './api-football/club';

export const apis = {
    footballdb: 'footballdb',
    footballData: 'football-data',
    apifootball: 'api-football'
};

export function loadLeagues(api) {
    switch (api) {
        case apis.footballdb:
            return footballdbLeagues;
        case apis.footballData:
            return footballDataLeagues;
        case apis.apifootball:
            return apiFootballLeagues;
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
            default:
                alert('No API found');
        }
    }
}

export function loadClubResources(api, leagueObj, club, clubs, matches) {
    const loadFootballData = function () {
        let loadedClub = club;
        const { league, standing, teams, matches } = leagueObj;
        const loadedLeague = new FootballDataLeague(league, standing, teams, matches);
        if (typeof club == 'string') {
            loadedClub = teams.find(t => t.name == club);
        }
        return new FootballDataClub(loadedClub, loadedLeague);
    }

    if (leagueObj && club) {
        switch (api) {
            case apis.footballdb:
                return new FootballDbClub(leagueObj, club);
            case apis.footballData:
                return loadFootballData();
            case apis.apifootball:
                return new ApiFootballClub(club, clubs, matches);
            default:
                alert('No API found');
        }
    }
}

export default apis;
