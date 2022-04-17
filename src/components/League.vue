<template>
  <div class="d-flex justify-content-center">
    <table>
      <tbody>
        <tr v-for="club in clubs" :key="club.code">
          <td>
            <a href='#' @click.prevent="selectClub(club)">{{ club.name }}</a>
          </td>
          <td>
            <race :matches="club.lastMatches()"></race>
          </td>
          <td>
            <span v-if="club.nextMatch()">
              {{ club.nextMatch().date }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Race from './club/Race';

export default {
  components: {
    race: Race,
  },
  computed: {
    ...mapGetters([
      'clubs'
    ])
  },
  methods: {
    ...mapMutations([
      'selectClub'
    ])
  }
};
</script>
