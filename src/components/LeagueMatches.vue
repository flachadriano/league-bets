<template>
  <div class="d-flex justify-content-center">
    <span style="display: none">{{ currentRound }}</span>
    <span @click="reload()" style="font-size: 2.3rem; margin-top: 20px">↺</span>
    <RoundMatches :key="1"
      :title="currentRoundName"
      :fixtures="currentRoundFixtures">
    </RoundMatches>
  </div>
</template>

<script>
import RoundMatches from './league/RoundMatches.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    RoundMatches,
  },
  computed: {
    ...mapGetters([
      'league',
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
