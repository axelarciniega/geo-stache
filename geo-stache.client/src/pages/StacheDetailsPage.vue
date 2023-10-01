<template>
    <div v-if="stache">
        <section class="container">
            <div class="row border border-black border-3">

                <div class="col-12 col-md-7">
                    <h1 class="text-center">{{ stache.stacheName }}</h1>
                    <p class="text-center">Description: {{ stache.description }}</p>
                    <p class="text-center">Difficulty: {{ stache.difficulty }}</p>
                    <p class="text-center">Hint: {{ stache.hint }}</p>
                    <!-- <p class="text-center">Badge Image: <img :src="stache.badgeImage" alt=""></p> -->
                    <p class="text-center">lat: {{ stache.lat }} || long: {{ stache.lng }}</p>
                    <!-- <p class="text-center">Creator: {{ stache.creator.name}}</p> -->
                </div>
                <div class="col-12 col-md-5 p-0 m-0"><img class="stacheImage" :src="stache.coverImage" alt="">
                </div>
                <div class="justify-content-around d-flex">
                    <button v-show="account.id == stache.creatorId" @click="editStache"
                        class=" btn bg-success border border-1 border-black col-2">
                        edit <i class="mdi mdi-icon"></i>
                    </button>
                    <button v-show="account.id == stache.creatorId" @click="deleteStache"
                        class=" btn bg-danger border border-1 border-black col-2 text-black">
                        delete <i class="mdi mdi-icon"></i>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { stachesService } from '../services/StachesService';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
// import { routerKey } from "vue-router";
import { useRouter } from "vue-router";


export default {


    setup() {
        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            getStacheById()
        })
        async function getStacheById() {
            try {
                await stachesService.getStacheById(route.params.stacheId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            stache: computed(() => AppState.activeStache),
            account: computed(() => AppState.account),

            async deleteStache() {
                try {
                    if (await Pop.confirm()) {
                        await stachesService.deleteStache(route.params.stacheId)
                        Pop.success('Successfully deleted stache')
                        router.push({ name: "Home" })
                    }

                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style scoped lang="scss">
.stacheImage {
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>