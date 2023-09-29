<template>
    <div v-if="stache">
        <section class="container">
            <div class="row border border-black border-3">
                
                <div class="col-12 col-md-7">
                    <h1 class="text-center">{{ stache.stacheName }}</h1>
                    <p class="text-center">Description: {{ stache.description }}</p>
                    <p class="text-center">Difficulty: {{ stache.difficulty }}</p>
                    <p class="text-center">Hint: {{ stache.hint }}</p>
                    <p class="text-center">Badge Image: <img :src="stache.badgeImage" alt=""></p>
                    <p class="text-center">lat: {{ stache.lat }} || long: {{ stache.lng }}</p>
                    <!-- <p class="text-center">Creator: {{ stache.creator.name}}</p> -->
                </div>
                    <div class="col-12 col-md-5 p-0 m-0"><img class="img-fluid " :src="stache.coverImage" alt="">
                </div>
                <button @click="deleteStache" class="bg-danger border border-1 border-black">
                    delete <i class="mdi mdi-icon"></i>
                </button>
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
            stache: computed(()=> AppState.activeStache),
            
            async deleteStache(){
                try {
                    if(await Pop.confirm()){
                        await stachesService.deleteStache(route.params.stacheId)
                        Pop.success('Successfully deleted stache')
                    }

                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style></style>