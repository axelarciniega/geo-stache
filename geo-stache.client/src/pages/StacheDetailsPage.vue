<template>
    <div v-if="stache">
        <section class="container">
            <div class="row">
                <div class="col-7">{{ stache.stacheName }}</div>
                <div class="col-5"></div>
                hello
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import { stachesService } from '../services/StachesService';
import {useRoute} from 'vue-router';
import { AppState } from '../AppState';


export default {


    setup() {
        const route = useRoute();
        onMounted(()=> {
            getStacheById()
        })
        async function getStacheById(){
            try {
                await stachesService.getStacheById(route.params.stacheId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            stache: computed(()=> AppState.activeStache)
        };
    },
};
</script>


<style></style>