<template>
  <div>
    <div class="d-flex justify-content-center">
      <h2>{{ league.name }}</h2>
      <span @click="closeLeague">X</span>
    </div>
    <div>
      <div class="d-flex justify-content-center mb-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked @click="changeTypeLeagueData(1)">
          <label class="form-check-label" for="flexRadioDefault1" @click="changeTypeLeagueData(1)">League matches</label>
        </div>
        <div class="form-check ml-2">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" @click="changeTypeLeagueData(2)">
          <label class="form-check-label" for="flexRadioDefault2" @click="changeTypeLeagueData(2)">Statistics</label>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center" >
      <RoundMatches v-if="typeLeagueData == 1" :title="currentRoundTitle"></RoundMatches>
      <LeagueStatistics v-if="typeLeagueData == 2"></LeagueStatistics>
    </div>
  </div>
</template>

<script>
import RoundMatches from './league-matches/RoundMatches.vue';
import LeagueStatistics from './league-statistics/LeagueStatistics.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    RoundMatches,
    LeagueStatistics,
  },
  computed: {
    ...mapGetters([
      'league',
      'currentRound',
      'currentRoundTitle',
      'typeLeagueData',
    ])
  },
  methods: {
    ...mapMutations([
      'closeLeague',
      'changeTypeLeagueData',
    ]),
  },
};
</script>
