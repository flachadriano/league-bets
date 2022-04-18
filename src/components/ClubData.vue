<template>
  <div class="d-flex justify-content-center m-1">
    <div>
      <h2 class="d-flex justify-content-center">
        <img height="40px" :src="club.imageUrl">
        <span class="ml-2">{{ club.name }}</span>
        <a class="close" href="#" @click.prevent="selectClub">(close)</a>
      </h2>
      <StatisticsData :club="club"></StatisticsData>
      <LastMatches :club="club"></LastMatches>
    </div>
  </div>
</template>

<script>
import StatisticsData from './club/StatisticsData';
import LastMatches from './club/LastMatches';

export default {
  props: ['club'],
  components: {
    StatisticsData,
    LastMatches
  },
  methods: {
    selectClub() {
      this.$emit('close', {});
    }
  }
};
</script>
