<template>
  <div id="app">
    <TopBar></TopBar>
    <GridLeague v-if="isGridApi && !hasSelectedLeague"></GridLeague>
    <LeagueHeader v-if="isGridApi && hasSelectedLeague"></LeagueHeader>
    <LeagueMatches v-if="isGridApi && hasSelectedLeague"></LeagueMatches>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import TopBar from './components/TopBar';
import LeagueHeader from './components/LeagueHeader.vue';
import GridLeague from './components/GridLeague.vue';
import LeagueMatches from './components/LeagueMatches.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    LeagueHeader,
    GridLeague,
    LeagueMatches,
  },
  computed: {
    ...mapGetters([
      'isGridApi',
      'hasSelectedLeague',
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
