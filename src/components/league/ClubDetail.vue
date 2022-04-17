<template>
  <div class="d-flex flex-column">
    <div class="mb-2">
      <img class="mr-2" :src="logo" width="24px" height="24px">
      <span>{{ name }}</span>
    </div>
    <div>
      <span>{{ rank }} - {{ points }} points</span>
    </div>
    <hr>
    <Standing :fixtures="league.lastMatches(id)" :standing="standing"></Standing>
    <hr>
    <span>Home/Away</span>
    <Standing :fixtures="homeawaymatches" :standing="standinghomeaway"></Standing>
  </div>
</template>

<script>
import Standing from './Standing';
import { mapGetters } from 'vuex';

export default {
  components: {
    Standing,
  },
  computed: {
    ...mapGetters([
      'league',
    ])
  },
  props: ['id', 'logo', 'name', 'rank', 'points', 'standing', 'standinghomeaway', 'homeawaymatches'],
};
</script>
