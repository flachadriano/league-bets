<template>
    <div class="d-flex justify-content-center">
        <div v-for="match in matches" :key="match.id">
            <div :key="match.date" style="width: 30px" class="mr-1 bg-secondary rounded" v-if="match.draw">{{ match.homeScore }}x{{ match.awayScore }}</div>
            <div :key="match.date" style="width: 30px" class="mr-1 bg-success rounded" v-else-if="match.win">{{ match.homeScore }}x{{ match.awayScore }}</div>
            <div :key="match.date" style="width: 30px" class="mr-1 bg-danger rounded" v-else>{{ match.homeScore }}x{{ match.awayScore }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['matches']
}
</script>