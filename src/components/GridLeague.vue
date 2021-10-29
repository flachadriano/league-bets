 <template>
    <div class="d-flex flex-wrap">
        <a class="d-flex flex-column ml-2 mb-5" 
            style="min-width: 200px" 
            @click.prevent="selectGridLeague(league.league)"
            v-for="league in leagues" :key="league.league.id">
            <div class="align-content-center">
                <img :src="league.league.logo">
            </div>
            <div class="align-content-center">
                <img :src="league.country.flag" height="24px" width="24px">
                <span class="ml-2">{{ league.league.name }}</span>
            </div>
        </a>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'leagues',
        ])
    },
    methods: {
        ...mapMutations([
            'selectGridLeague',
        ])
    }
}
</script>
