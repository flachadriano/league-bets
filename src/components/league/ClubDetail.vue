<template>
    <div class="d-flex flex-column">
        <div class="mb-2">
            <img class="mr-2" :src="logo" width="24px" height="24px">
            <span>{{ name }}</span>
        </div>
        <Race :matches="league.lastMatches(id)" :key="1"></Race>
        <div>
            <span>{{ rank }} - {{ points }} points</span>
        </div>
        <div>
            <span>{{ standing.played }} P | </span>
            <span>{{ standing.win }} W | </span>
            <span>{{ standing.draw }} D | </span>
            <span>{{ standing.lose }} L</span>
        </div>
        <div>
            <span>{{ standing.goals.for }}:{{ standing.goals.against }} Goals</span>
        </div>
        <div>
            <span>{{ standing.goals.for / standing.played }}:{{ standing.goals.against /standing.played }} Goals per match</span>
        </div>
        <hr>
        <span>Home/Away</span>
        <Race :matches="homeawaymatches" :key="2"></Race>
        <div>
            <span>{{ standinghomeaway.played }} P | </span>
            <span>{{ standinghomeaway.win }} W | </span>
            <span>{{ standinghomeaway.draw }} D | </span>
            <span>{{ standinghomeaway.lose }} L</span>
        </div>
        <div>
            <span>{{ standinghomeaway.goals.for }}:{{ standinghomeaway.goals.against }} Goals</span>
        </div>
        <div>
            <span>{{ standinghomeaway.goals.for/standinghomeaway.played }}:{{ standinghomeaway.goals.against/standinghomeaway.played }} Goals per match</span>
        </div>
    </div>
</template>

<script>
import Race from '../club/Race.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Race,
    },
    computed: {
        ...mapGetters([
            'league',
        ])
    },
    props: ['id', 'logo', 'name', 'rank', 'points', 'standing', 'standinghomeaway', 'homeawaymatches'],
}
</script>
