<template>
  <div class="d-flex justify-content-center">
    <RoundData :key="1"
      :title="currentRoundName"
      :fixtures="currentRoundFixtures">
    </RoundData>
    <RoundData class="ml-2 mr-2"
      :key="2"
      :title="league.nextRoundName"
      :fixtures="league.nextRoundFixtures">
    </RoundData>
    <MatchData v-if="hasFixture"
      :fixture="fixture">
    </MatchData>
  </div>
</template>

<script>
import RoundData from './league/RoundData.vue';
import MatchData from './league/MatchData.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    RoundData,
    MatchData,
  },
  computed: {
    ...mapGetters([
      'league',
      'hasFixture',
      'fixture',
    ])
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
