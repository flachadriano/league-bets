<template>
    <div class="d-flex flex-column">
        <Race class="mb-2" :matches="fixtures"></Race>
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
            <span>{{ (standing.goals.for/standing.played).toFixed(2) }}:{{ (standing.goals.against/standing.played).toFixed(2) }} Goals per match</span>
        </div>
    </div>
</template>

<script>
import Race from '../club/Race.vue';

export default {
    components: {
        Race,
    },
    props: ['fixtures', 'standing'],
}
</script>
