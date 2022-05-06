<template>
  <div>
    <h2>
      <span @click="previousRound()" style="font-size: 4rem">←</span>
      {{ currentRoundTitle }}
      <span @click="nextRound()" style="font-size: 4rem">→</span>
    </h2>
    <div class="d-flex">
      <div>
        <MatchRow v-for="fixture in fixtures" :key="fixture.id" :fixture="fixture" :selected="fixture.id == selectedFixture.id"></MatchRow>
      </div>
      <MatchData v-if="hasFixture" :fixture="selectedFixture"></MatchData>
    </div>
  </div>
</template>

<script>
import MatchRow from './MatchRow.vue';
import MatchData from './MatchData.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    MatchRow,
    MatchData,
  },
  computed: {
    ...mapGetters([
      'league',
      'hasFixture',
      'selectedFixture',
      'currentRoundTitle',
    ])
  },
  methods: {
    previousRound() {
      this.league.loadPreviousFixture();
      this.$asyncComputed.fixtures.update();
    },
    nextRound() {
      this.league.loadNextFixture();
      this.$asyncComputed.fixtures.update();
    },
  },
  asyncComputed: {
    async fixtures() {
      return this.league.currentRoundFixtures();
    },
  },
};
</script>
