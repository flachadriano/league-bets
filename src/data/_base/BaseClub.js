export default class BaseClub {
  constructor(club, league, matches) {
    this.club = club;
    this.data = club;
    this.league = league;
    this.matches = matches;

    this.name = club.name;
    this.imageUrl = club.team?.crestUrl || club.logo;
  }

  static validate(club) {
    if (!club.name) {
      console.error('club should have name attribute.');
    }
  }

  position() {
    console.warn('Implement method: position');
    return 0;
  }

  scored() {
    console.warn('Implement method: scored');
    return 0;
  }

  scoredPerMatch() {
    console.warn('Implement method: scoredPerMatch');
    return 0;
  }

  rankedScore() {
    console.warn('Implement method: rankedScore');
    return 0;
  }

  against() {
    console.warn('Implement method: against');
    return 0;
  }

  againstPerMatch() {
    console.warn('Implement method: againstPerMatch');
    return 0;
  }

  rankedAgainst() {
    console.warn('Implement method: rankedAgainst');
    return 0;
  }

  nextMatch() {
    console.warn('Implement method: nextMatch');
    return {};
  }

  lastMatches() {
    console.warn('Implement method: lastMatches');
    return [];
  }
}
