export default class LastMatches {
  constructor(matches) {
    this.data = matches || [];

    this.scoredInFirstHalf = this.data.reduce((acc, m) => acc + (m.teamScoreFirstHalf > 0 ? 1 : 0), 0);
    this.againstInFirstHalf = this.data.reduce((acc, m) => acc + (m.teamAgainstFirstHalf > 0 ? 1 : 0), 0);
    this.maxScoredInFirstHalf = Math.max(...this.data.map(m => m.teamScoreFirstHalf));
    this.maxAgainstInFirstHalf = Math.max(...this.data.map(m => m.teamAgainstFirstHalf));

    this.scoredInSecondHalf = this.data.reduce((acc, m) => acc + (m.teamScoreSecondHalf > 0 ? 1 : 0), 0);
    this.againstInSecondHalf = this.data.reduce((acc, m) => acc + (m.teamAgainstSecondHalf > 0 ? 1 : 0), 0);
    this.maxScoredInSecondHalf = Math.max(...this.data.map(m => m.teamScoreSecondHalf));
    this.maxAgainstInSecondHalf = Math.max(...this.data.map(m => m.teamAgainstSecondHalf));

    this.scoredInFullTime = this.data.reduce((acc, m) => acc + (m.teamScored > 0 ? 1 : 0), 0);
    this.againstInFullTime = this.data.reduce((acc, m) => acc + (m.teamAgainst > 0 ? 1 : 0), 0);
    this.maxScoredInFullTime = Math.max(...this.data.map(m => m.teamScored));
    this.maxAgainstInFullTime = Math.max(...this.data.map(m => m.teamAgainst));

    this.over25 = this.data.reduce((acc, m) => acc + (m.teamScored + m.teamAgainst > 2 ? 1 : 0), 0);
    this.cleanSheet = this.data.reduce((acc, m) => acc + (m.teamAgainst == 0 ? 1 : 0), 0);
    this.bothScore = this.data.reduce((acc, m) => acc + ((m.teamScored > 0 && m.teamAgainst > 0) ? 1 : 0), 0);
  }
}
