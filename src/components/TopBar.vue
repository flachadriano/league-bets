<template>
  <div class="d-flex justify-content-center m-2">
    <div class="d-flex">
      <select class="custom-select" :value="api" @input="changeApi">
        <option v-for="item in apis" :key="item" :value="item">{{ item }}</option>
      </select>
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
    ])
  }
};
</script>
