<template>
  <div style="background-color: #666" class="m-2">
    <h3>Next match</h3>
    <div v-if="match && match.team1 == club.name">
      <span>{{ match && match.date }}</span>
      <span> {{ match && match.team1 }}</span>
      <span> X </span>
      <a href="#" @click.prevent="selectCompareClub(match.team2)">{{ match && match.team2 }}</a>
    </div>
    <div v-else-if="match && match.date">
      <span>{{ match && match.date }}</span>
      <a href="#" @click.prevent="selectCompareClub(match.team1)"> {{ match && match.team1 }}</a>
      <span> X </span>
      <span>{{ match && match.team2 }}</span>
    </div>
    <div v-else>
      <span>-- x --</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'club'
    ])
  },
  methods: {
    ...mapMutations([
      'selectCompareClub'
    ])
  },
  asyncComputed: {
    async match() {
      return await this.club.nextMatch();
    }
  }
};
</script>
