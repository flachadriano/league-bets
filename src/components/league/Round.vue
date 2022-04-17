<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <Fixture :fixture="fixture" v-for="fixture in fixtures" :key="fixture.id"></Fixture>
    </div>
  </div>
</template>

<script>
import Fixture from './Fixture.vue';

export default {
  components: {
    Fixture,
  },
  props: ['title', 'fixtures'],
};
</script>
