 <template>
    <div class="d-flex justify-content-center m-2 flex-column">
        <div class="d-flex" v-for="league in leaguesList" :key="league">
            <span>{{ league }}</span>
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
