<template>
  <div>
    <h2>
      <span @click="previousRound()" style="font-size: 4rem">←</span>
      {{ title }}
      <span @click="nextRound()" style="font-size: 4rem">→</span>
    </h2>
    <div>
      <MatchRow :fixture="fixture" v-for="fixture in fixtures" :key="fixture.id"></MatchRow>
    </div>
  </div>
</template>

<script>
import MatchRow from './MatchRow.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    MatchRow,
  },
  methods: {
    ...mapMutations([
      'previousRound',
      'nextRound',
    ]),
  },
  props: ['title', 'fixtures'],
};
</script>
