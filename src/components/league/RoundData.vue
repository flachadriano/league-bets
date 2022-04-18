<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <MatchRow :fixture="fixture" v-for="fixture in fixtures" :key="fixture.id"></MatchRow>
    </div>
  </div>
</template>

<script>
import MatchRow from './MatchRow.vue';

export default {
  components: {
    MatchRow,
  },
  props: ['title', 'fixtures'],
};
</script>
