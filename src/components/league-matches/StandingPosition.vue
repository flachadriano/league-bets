<template>
  <div class="d-flex flex-column">
    <RaceData class="mb-2" :matches="fixtures"></RaceData>
    <div>
      <span>{{ standing.played }} P | </span>
      <span>{{ standing.won }} W | </span>
      <span>{{ standing.draw }} D | </span>
      <span>{{ standing.lost }} L</span>
    </div>
    <div>
      <span>{{ standing.goalsFor }}:{{ standing.goalsAgainst }} Goals</span>
    </div>
    <div>
      <span>{{ (standing.goalsFor/standing.played).toFixed(2) }}:{{ (standing.goalsAgainst/standing.played).toFixed(2) }} Goals per match</span>
    </div>
    <div>
      <span>{{ standing.btts }} Both teams to score - {{ (standing.btts / standing.played * 100).toFixed() }}%</span>
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
