<template>
  <div class="d-flex justify-content-center m-2">
    <div class="d-flex">
      <select class="custom-select" :value="api" @input="changeApi">
        <option v-for="item in apis" :key="item" :value="item">{{ item }}</option>
      </select>
      <select class="custom-select ml-1" :value="leagueId" @input="changeLeague">
        <option value="0">Select the league</option>
        <option v-for="item in leagues" :key="item.key" :value="item.key">{{ item.value }}</option>
      </select>
      <span class="ml-2" v-if="loadingClubs">Loading clubs</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'apis',
      'api',
      'leagues',
      'leagueId',
      'loadingClubs',
    ])
  },
  methods: {
    ...mapMutations([
      'changeApi',
      'changeLeague',
    ])
  }
};
</script>
