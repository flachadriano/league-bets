<template>
  <div class="d-flex mb-3 p-1" @click="selectFixture(fixture)" :class="{ 'bg-secondary': selected }">
    <div class="align-items-center">
      <span>{{ fixture.dateStr }}</span>
    </div>
    <div class="ml-2 mr-2">
      <div class="d-flex justify-content-start mb-1">
        <img class="mr-2" :src="fixture.homeLogo" width="24px" height="24px">
        <span>{{ fixture.home }}</span>
      </div>
      <div class="d-flex justify-content-start">
        <img class="mr-2" :src="fixture.awayLogo" width="24px" height="24px">
        <span>{{ fixture.away }}</span>
      </div>
    </div>
    <div class="d-flex flex-column">
      <span class="mb-1">{{ fixture.homeScore }}</span>
      <span>{{ fixture.awayScore }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'selectFixture',
    ])
  },
  props: ['fixture', 'selected'],
};
</script>
