import BaseGridLeague from '../BaseGridLeague';
import { URL, HEADERS } from './Resources';

export default class League extends BaseGridLeague {

    async loadLeagues() {
        return await fetch(`${URL}/leagues`, HEADERS)
            .then(r => r.json())
            .then(data => data.response)
            .then(data => data.filter(league => league.country.name != 'World'))
            .then(data => data.sort((a, b) => {
                if (a.country.name < b.country.name) {
                    return -1;
                }
                if (a.country.name > b.country.name) {
                    return 1;
                }
                return 0;
            }))
            .then(data => data.filter(league => {
                const leagues = [128, 71, 39, 61, 78, 135, 94, 140, 253];
                return leagues.includes(league.league.id);
            }))
            .then(data => data.filter(league => ![].includes(league.league.id)))
            .then(data => data.map(league => `${league.country.name} / ${league.league.name} (ID: ${league.league.id})`));
    }

}
