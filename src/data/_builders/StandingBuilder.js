export default class StandingBuilder {
  constructor() {
    this.data = [];
  }

  item(item) {
    this.data.push(item);
    return this;
  }

  build() {
    return this.data;
  }
}
