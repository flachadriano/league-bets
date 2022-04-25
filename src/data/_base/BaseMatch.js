export default class Match {
  constructor(data) {
    Object.keys(data).forEach(k => this[k] = data[k]);
  }
}
