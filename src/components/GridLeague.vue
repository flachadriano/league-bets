 <template>
    <div class="d-flex flex-wrap">
        <div class="d-flex flex-column ml-2 mb-5" style="min-width: 200px" v-for="league in leaguesList" :key="league">
            <div class="align-content-center">
                <img :src="league.league.logo">
            </div>
            <div class="align-content-center">
                <img :src="league.country.flag" height="24px" width="24px">
                <span class="ml-2">{{ league.league.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'leaguesList',
        ])
    },
    methods: {
        ...mapMutations([
            'changeApi',
            'changeLeague',
        ])
    }
}
</script>
