<template>
  <div class="d-flex">
    <ClubDetail :key="1"
      :id="fixture.homeId"
      :logo="fixture.homeLogo"
      :name="fixture.home"
      :rank="league.teamStanding(fixture.homeId).rank"
      :points="league.teamStanding(fixture.homeId).points"
      :standing="league.teamStanding(fixture.homeId).all"
      :standinghomeaway="league.teamStanding(fixture.homeId).home"
      :homeawaymatches="league.lastHomeMatches(fixture.homeId)">
    </ClubDetail>
    <ClubDetail class="ml-2"
      :key="2"
      :id="fixture.awayId"
      :logo="fixture.awayLogo"
      :name="fixture.away"
      :rank="league.teamStanding(fixture.awayId).rank"
      :points="league.teamStanding(fixture.awayId).points"
      :standing="league.teamStanding(fixture.awayId).all"
      :standinghomeaway="league.teamStanding(fixture.awayId).away"
      :homeawaymatches="league.lastAwayMatches(fixture.awayId)">
    </ClubDetail>
  </div>
</template>

<script>
import ClubDetail from './ClubDetail.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ClubDetail,
  },
  computed: {
    ...mapGetters([
      'league',
    ])
  },
  props: ['fixture'],
};
</script>
