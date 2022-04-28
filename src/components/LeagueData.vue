<template>
  <div>
    <div class="d-flex justify-content-center">
      <h2>{{ league.name }}</h2>
      <span @click="closeLeague">X</span>
    </div>
    <div>
      <div class="d-flex justify-content-center mb-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="leagueType" id="leagueType1" checked @click="changeTypeLeagueData(1)">
          <label class="form-check-label" for="leagueType1" @click="changeTypeLeagueData(1)">League matches</label>
        </div>
        <div class="form-check ml-2">
          <input class="form-check-input" type="radio" name="leagueType" id="leagueType2" @click="changeTypeLeagueData(2)">
          <label class="form-check-label" for="leagueType2" @click="changeTypeLeagueData(2)">Standing</label>
        </div>
        <div class="form-check ml-2">
          <input class="form-check-input" type="radio" name="leagueType" id="leagueType3" @click="changeTypeLeagueData(3)">
          <label class="form-check-label" for="leagueType3" @click="changeTypeLeagueData(3)">Statistics</label>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center" >
      <RoundMatches v-if="typeLeagueData == 1"></RoundMatches>
      <LeagueStanding v-if="typeLeagueData == 2"></LeagueStanding>
      <LeagueStatistics v-if="typeLeagueData == 3"></LeagueStatistics>
    </div>
  </div>
</template>

<script>
import RoundMatches from './league-matches/RoundMatches.vue';
import LeagueStanding from './league-standing/LeagueStanding.vue';
import LeagueStatistics from './league-statistics/LeagueStatistics.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    RoundMatches,
    LeagueStanding,
    LeagueStatistics,
  },
  computed: {
    ...mapGetters([
      'league',
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
