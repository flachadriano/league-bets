export default class Match {
  constructor(date, team1, team2, score1, score2) {
    this.team1 = team1;
    this.team2 = team2;
    this.score1 = score1;
    this.score2 = score2;

    const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', hour: '2-digit', minute: 'numeric' });

    const [{ value: month },, { value: day },, { value: hour },, { value: minute },, { value: dayPeriod }] = dateTimeFormat.formatToParts(new Date(date));
    this.date = `${month}-${day} ${hour}:${minute} ${dayPeriod}`;
    this.dateObj = new Date(date);
  }

  static validatePlayed(data) {
    const validate = attr => {
      if (typeof data[attr] == 'undefined') {
        console.error(`match must have ${attr} attribute`);
      }
    };

    ['win', 'draw', 'lose',
      'teamScoreFirstHalf', 'teamAgainstFirstHalf',
      'teamScoreSecondHalf', 'teamAgainstSecondHalf',
      'teamScored', 'teamAgainst'].forEach(attr => validate(attr));
  }
}
