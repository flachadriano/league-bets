 <template>
  <div class="d-flex flex-wrap justify-content-center p-5">
    <a class="d-flex flex-column ml-2 mb-5 card text-white bg-secondary p-2"
      style="min-width: 300px"
      @click.prevent="selectLeague(league)"
      v-for="league in leagues" :key="league.id">
      <div class="align-content-center">
        <img :src="league.logo" height="96px" width="96px">
      </div>
      <div class="align-content-center">
        <img :src="league.country.flag" height="24px" width="24px">
        <span class="ml-2">{{ league.name }}</span>
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'leagues',
    ])
  },
  methods: {
    ...mapMutations([
      'selectLeague',
    ])
  }
};
</script>
