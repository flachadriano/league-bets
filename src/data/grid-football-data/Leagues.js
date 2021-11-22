import BaseGridLeague from '../BaseGridLeague';
import { URL, HEADERS } from './Resources';
import League from './League';

export default class Leagues extends BaseGridLeague {

    async loadLeagues() {
        return await fetch(`${URL}/competitions`, HEADERS)
            .then(r => r.json())
            .then(data => data.competitions)
            .then(leagues => leagues.filter(league => ['BL1', 'DED', 'BSA', 'PD', 'FL1', 'PPL', 'SA', 'PL'].indexOf(league.code) >= 0))
            .then(leagues => leagues.map(league => new League({ country: league.area, ...league })));
    }

}
