<template>
    <div style="background-color: #666" class="card p-1">
        <h3 class="card-title mt-2">This season</h3>
        <div>
            <span>Position: {{ position }}</span><br/>
            <span>{{ scored }} goals for (average {{ scoredPerMatch }} - {{ rankedScore }} best attack)</span><br/>
            <span>{{ against }} goals against (against {{ againstPerMatch }} - {{ rankedAgainst }} best defense)</span><br/>
        </div>
        <NextMatch></NextMatch>
    </div>
</template>

<script>
import NextMatch from './NextMatch';

export default {
  props: ['club'],
  components: {
    NextMatch,
  },
  asyncComputed: {
    async position() {
      return await this.club.position();
    },
    async scored() {
      return await this.club.scored();
    },
    async scoredPerMatch() {
      return await this.club.scoredPerMatch();
    },
    async rankedScore() {
      return await this.club.rankedScore();
    },
    async against() {
      return await this.club.against();
    },
    async againstPerMatch() {
      return await this.club.againstPerMatch();
    },
    async rankedAgainst() {
      return await this.club.rankedAgainst();
    },
  }
};
</script>
