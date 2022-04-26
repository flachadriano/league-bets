<template>
  <div id="app">
    <TopBar></TopBar>
    <GridLeague v-if="!hasSelectedLeague"></GridLeague>
    <LeagueMatches v-if="hasSelectedLeague"></LeagueMatches>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TopBar from './components/TopBar';
import LeagueMatches from './components/LeagueMatches.vue';
import GridLeague from './components/GridLeague.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    GridLeague,
    LeagueMatches,
  },
  computed: {
    ...mapGetters([
      'hasSelectedLeague',
    ])
  },
};
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
