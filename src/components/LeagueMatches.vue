<template>
  <div class="d-flex justify-content-center">
    <span style="display: none">{{ currentRound }}</span>
    <span @click="reload()" style="font-size: 2.3rem; margin-top: 20px">↺</span>
    <RoundMatches :key="1"
      :title="currentRoundName"
      :fixtures="currentRoundFixtures">
    </RoundMatches>
    <MatchData v-if="hasFixture"
      :fixture="fixture">
    </MatchData>
  </div>
</template>

<script>
import RoundMatches from './league/RoundMatches.vue';
import MatchData from './league/MatchData.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    RoundMatches,
    MatchData,
  },
  computed: {
    ...mapGetters([
      'league',
      'hasFixture',
      'fixture',
      'currentRound',
    ])
  },
  methods: {
    reload() {
      this.$asyncComputed.currentRoundFixtures.update();
    }
  },
  asyncComputed: {
    async currentRoundName() {
      return this.league.currentRoundName();
    },
    async currentRoundFixtures() {
      return this.league.currentRoundFixtures();
    },
  },
};
</script>
