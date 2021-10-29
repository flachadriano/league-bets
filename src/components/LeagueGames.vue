<template>
    <div class="d-flex justify-content-center">
        <span>funcionou!!</span>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
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
}
</script>
