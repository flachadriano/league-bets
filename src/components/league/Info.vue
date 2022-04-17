<template>
  <div class="d-flex justify-content-center">
    <h2>{{ league.name }}</h2>
    <span @click="closeLeague">X</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'league',
    ])
  },
  methods: {
    ...mapMutations([
      'closeLeague',
    ])
  },
};
</script>
