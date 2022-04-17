<template>
  <div class="d-flex justify-content-center">
    <Round :key="1"
      :title="currentRoundName"
      :fixtures="currentRoundFixtures">
    </Round>
    <Round class="ml-2 mr-2"
      :key="2"
      :title="league.nextRoundName"
      :fixtures="league.nextRoundFixtures">
    </Round>
    <Details v-if="hasFixture"
      :fixture="fixture">
    </Details>
  </div>
</template>

<script>
import Round from './league/Round.vue';
import Details from './league/Details.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Round,
    Details,
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
