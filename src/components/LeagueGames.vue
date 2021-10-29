<template>
    <div class="d-flex justify-content-center">
        <Round :title="league.currentRoundName" :fixtures="league.currentRoundFixtures"></Round>
    </div>
</template>

<script>
import Round from './league/Round.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Round: Round,
    },
    computed: {
        ...mapGetters([
            'league'
        ])
    },
}
</script>
