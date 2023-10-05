<template>
    <v-tour name="geoTour" :steps="steps" :callbacks="geoTourCallbacks"></v-tour>
</template>


<script>

export default {
    props: {
        steps: { type: Array, required: true },
        callbacks: { type: Object }
    },
    setup() {
        return {}
    },
    mounted: function () {
        this.$tours[`geoTour`].start()
    }
}

</script>


<style lang="scss" scoped></style>