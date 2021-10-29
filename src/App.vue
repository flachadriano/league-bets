<template>
  <div id="app">
    <Leagues></Leagues>
    <League v-if="!hasSelectedClub && api != 'grid'"></League>
    <GridLeague v-if="api == 'grid'"></GridLeague>
    <LeagueGames v-if="api == 'grid'"></LeagueGames>
    <div class="d-flex justify-content-center">
      <Club v-if="hasSelectedClub" :club="club" @close="selectClub"></Club>
      <Club v-if="Object.keys(compareClub).length > 0" :club="compareClub" @close="selectCompareClub"></Club>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Leagues from './components/Leagues';
import League from './components/League';
import Club from './components/Club';
import GridLeague from './components/GridLeague.vue';
import LeagueGames from './components/LeagueGames.vue';

export default {
  name: 'App',
  components: {
    Leagues,
    League,
    Club,
    GridLeague,
    LeagueGames,
  },
  computed: {
      ...mapGetters([
        'api',
        'hasSelectedClub',
        'club',
        'compareClub',
        'league',
      ])
  },
  methods: {
    ...mapMutations([
        'selectClub',
        'selectCompareClub',
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app a {
  color: #ddd;
  font-size: 18px;
}

#app a:hover {
  color: #ddd;
  text-decoration: none;
}
</style>
