<template>
  <div class="d-flex flex-column">
    <RaceData class="mb-2" :matches="fixtures"></RaceData>
    <div>
      <span>{{ standing.played }} P | </span>
      <span>{{ standing.win }} W | </span>
      <span>{{ standing.draw }} D | </span>
      <span>{{ standing.lose }} L</span>
    </div>
    <div>
      <span>{{ standing.goals.for }}:{{ standing.goals.against }} Goals</span>
    </div>
    <div>
      <span>{{ (standing.goals.for/standing.played).toFixed(2) }}:{{ (standing.goals.against/standing.played).toFixed(2) }} Goals per match</span>
    </div>
    <div>
      <span>{{ fixtures.filter(f => f.homeScore > 0 && f.awayScore > 0).length }} Both teams to score</span>
    </div>
  </div>
</template>

<script>
import RaceData from './RaceData.vue';

export default {
  components: {
    RaceData,
  },
  props: ['fixtures', 'standing'],
};
</script>
