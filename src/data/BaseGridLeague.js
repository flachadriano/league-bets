import BaseLeague from './_base/BaseLeague';

export default class BaseGridLeague extends BaseLeague {
  async loadLeagues() {
    console.error('loadLeagues not implemented.');
    return new Promise(resolve => resolve([]));
  }
}
