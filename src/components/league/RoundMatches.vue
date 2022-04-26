<template>
  <div>
    <h2>
      <span @click="previousRound()" style="font-size: 4rem">←</span>
      {{ title }}
      <span @click="nextRound()" style="font-size: 4rem">→</span>
    </h2>
    <div style="display: flex">
      <div>
        <MatchRow :fixture="fixture" v-for="fixture in fixtures" :key="fixture.id"></MatchRow>
      </div>
      <MatchData v-if="hasFixture" :fixture="fixture"></MatchData>
    </div>
  </div>
</template>

<script>
import MatchRow from './MatchRow.vue';
import MatchData from './MatchData.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  components: {
    MatchRow,
    MatchData,
  },
  computed: {
    ...mapGetters([
      'hasFixture',
      'fixture',
    ])
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
