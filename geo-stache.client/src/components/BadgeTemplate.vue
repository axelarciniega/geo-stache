<template>
    <div>
        <div v-if="adventure.status == 'completed'" class=" ">
            <div class="d-flex">
                <img :title="adventure.stache.stacheName" class="border border-5 border-warning badge-pic2" :src="adventure.stache.badgeImage" alt="">
            </div>
        </div>

    </div>
</template>

<script>
import { Adventure } from '../models/Adventure';
export default {
    props: {
        adventure: { type: Adventure || Object, required: true },
    },


    setup() {
        return {};
    },
};
</script>


<style>
.badge-pic2 {
    height: 100px;
    max-width: 100px;
    width: 70%;

    border-radius: 60%;
    object-fit: cover;
    object-position: center;
}
</style>