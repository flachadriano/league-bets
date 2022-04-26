<template>
  <div id="app">
    <TopBar></TopBar>
    <GridLeague v-if="!hasSelectedLeague"></GridLeague>
    <LeagueData v-if="hasSelectedLeague"></LeagueData>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TopBar from './components/TopBar';
import LeagueData from './components/LeagueData.vue';
import GridLeague from './components/GridLeague.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    GridLeague,
    LeagueData,
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
