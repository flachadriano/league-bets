<template>
  <div>
    <div class="d-flex justify-content-center">
      <h2>{{ league.name }}</h2>
      <span @click="closeLeague">X</span>
    </div>
    <div class="d-flex justify-content-center">
      <span @click="reload()" style="font-size: 2.3rem; margin-top: 20px">↺</span>
      <RoundMatches :key="1"
        :title="currentRoundTitle"
        :fixtures="currentRoundFixtures">
      </RoundMatches>
    </div>
  </div>
</template>

<script>
import RoundMatches from './league/RoundMatches.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    RoundMatches,
  },
  computed: {
    ...mapGetters([
      'league',
      'currentRound',
      'currentRoundTitle',
    ])
  },
  methods: {
    ...mapMutations([
      'closeLeague',
    ]),
    reload() {
      this.$asyncComputed.currentRoundFixtures.update();
    }
  },
  asyncComputed: {
    async currentRoundFixtures() {
      return this.league.currentRoundFixtures();
    },
  },
};
</script>
