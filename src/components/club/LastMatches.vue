<template>
  <div style="background-color: #666" class="card p-2">
    <h3>Last 6 matches</h3>
    <div class="mb-2">
      <race :matches="matches.data"></race>
    </div>
    <table class="mb-1">
      <thead class="border-bottom">
        <td></td>
        <td>Scored goals</td>
        <td>Goals against</td>
      </thead>
      <tbody>
          <tr>
              <td>First half</td>
              <td>{{ matches.scoredInFirstHalf }}/{{ matches.data.length }}</td>
              <td>{{ matches.againstInFirstHalf }}/{{ matches.data.length }}</td>
          </tr>
          <tr class="border-bottom">
              <td>Max in first half</td>
              <td>{{ matches.maxScoredInFirstHalf }}</td>
              <td>{{ matches.maxAgainstInFirstHalf }}</td>
          </tr>
          <tr>
              <td>Second half</td>
              <td>{{ matches.scoredInSecondHalf }}/{{ matches.data.length }}</td>
              <td>{{ matches.againstInSecondHalf }}/{{ matches.data.length }}</td>
          </tr>
          <tr class="border-bottom">
              <td>Max in second half</td>
              <td>{{ matches.maxScoredInSecondHalf }}</td>
              <td>{{ matches.maxAgainstInSecondHalf }}</td>
          </tr>
          <tr>
              <td>Full time</td>
              <td>{{ matches.scoredInFullTime }}/{{ matches.data.length }}</td>
              <td>{{ matches.againstInFullTime }}/{{ matches.data.length }}</td>
          </tr>
          <tr class="border-bottom">
              <td>Max in a match</td>
              <td>{{ matches.maxScoredInFullTime }}</td>
              <td>{{ matches.maxAgainstInFullTime }}</td>
          </tr>
      </tbody>
    </table>
    <div class="border-bottom">
        <div>
            <span v-if="matches.over25 >= (matches.data.length / 2)">Over 2.5 goals in {{ matches.over25 }}/{{ matches.data.length }} matches</span>
            <span v-else>Less than 2.5 goals in {{ matches.data.length - matches.over25 }}/{{ matches.data.length }} matches</span>
        </div>
        <div>
            <span v-if="matches.cleanSheet >= (matches.data.length / 2)">Clean sheet in {{ matches.cleanSheet }}/{{ matches.data.length }} matches</span>
            <span v-else>Without clean sheet in {{ matches.data.length - matches.cleanSheet }}/{{ matches.data.length }} matches</span>
        </div>
        <div>
            <span v-if="matches.bothScore >= (matches.data.length / 2)">Both teams scoring {{ matches.bothScore }}/{{ matches.data.length }} matches</span>
        </div>
    </div>
    <table style="color: #ddd">
        <tbody>
            <tr v-for="match in matches.data" :key="match.date">
                <td>{{ match.date }}</td>
                <td> {{ match.team1 }}</td>
                <td> {{ match.score1 }}</td>
                <td> X </td>
                <td> {{ match.score2 }}</td>
                <td> {{ match.team2 }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import Race from './Race';
import BaseMatch from '../../data/base-match';
import LastMatchesProcessor from './LastMatchesProcessor';

export default {
  props: ['club'],
  components: {
    race: Race
  },
  computed: {
    matches() {
      const lastMatches = this.club.lastMatches(6);
      if (lastMatches.length > 0) {
        BaseMatch.validatePlayed(lastMatches[0]);
      }
      return new LastMatchesProcessor(lastMatches);
    }
  }
};
</script>
