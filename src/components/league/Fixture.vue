<template>
    <div class="d-flex justify-content-center">
        <img :src="fixture.homeLogo">
        <span>{{ fixture.home }}</span>
        X
        <img :src="fixture.awayLogo">
        <span>{{ fixture.away }}</span>
    </div>
</template>

<script>
export default {
    props: ['fixture'],
}
</script>
