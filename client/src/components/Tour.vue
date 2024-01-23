<template>
    <v-tour name="geoTour" :steps="steps" :callbacks="myCallbacks"></v-tour>
</template>


<script>

export default {
    props: {
        steps: { type: Array, required: true },
        myCallbacks: { type: Object }
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