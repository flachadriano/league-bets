<template>
  <div class="d-flex flex-column">
    <div class="mb-2 card text-white bg-secondary">
      <div class="d-flex justify-content-center mt-2 mb-2 ml-2 mr-2">
        <img class="mr-2" :src="logo" width="24px" height="24px">
        <span>{{ name }}</span>
      </div>
    </div>
    <div>
      <span>{{ rank }} - {{ points }} points</span>
    </div>
    <hr>
    <StandingPosition :fixtures="league.lastMatches(id)" :standing="standing"></StandingPosition>
    <hr>
    <span>Home/Away</span>
    <StandingPosition :fixtures="homeawaymatches" :standing="standinghomeaway"></StandingPosition>
  </div>
</template>

<script>
import StandingPosition from './StandingPosition';
import { mapGetters } from 'vuex';

export default {
  components: {
    StandingPosition,
  },
  computed: {
    ...mapGetters([
      'league',
    ])
  },
  props: ['id', 'logo', 'name', 'rank', 'points', 'standing', 'standinghomeaway', 'homeawaymatches'],
};
</script>
