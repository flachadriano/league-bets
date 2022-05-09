<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th>Played</th>
        <th>Points</th>
        <th>Won</th>
        <th>Draw</th>
        <th>Lost</th>
        <th>Goals</th>
      </tr>
    </thead>
    <tbody>
      <tr style="line-height: 2rem" class="border-bottom border-secondary" v-for="stand in league.standing.table" :key="stand.position">
        <td>{{stand.position}}</td>
        <td class="d-flex ml-1"><img :src="stand.logo" height="24px" width="24px" class="mt-1"><span class="ml-2">{{stand.name}}</span></td>
        <td>{{stand.played}}</td>
        <td>{{stand.points}}</td>
        <td>{{stand.won}}</td>
        <td>{{stand.draw}}</td>
        <td>{{stand.lost}}</td>
        <td>{{stand.goalsFor}}:{{stand.goalsAgainst}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'league',
    ])
  },
};
</script>
