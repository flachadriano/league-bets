<template>
  <div class="d-flex justify-content-center">
    <div v-for="(match, i) in matches" :key="match.id">
      <div :key="i" style="width: 30px" class="mr-1 bg-secondary rounded" v-if="match.draw">{{ match.homeScore }}x{{ match.awayScore }}</div>
      <div :key="i" style="width: 30px" class="mr-1 bg-success rounded" v-else-if="match.won">{{ match.homeScore }}x{{ match.awayScore }}</div>
      <div :key="i" style="width: 30px" class="mr-1 bg-danger rounded" v-else>{{ match.homeScore }}x{{ match.awayScore }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['matches']
};
</script>
