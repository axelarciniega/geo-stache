<template>
    <section class="container">
        <h1 class="text-center">{{ profile.name }}'s profile page</h1>
        <section class="row justify-content-around mt-5">
            <div class="borderChange col-12 col-md-3 my-md-4 order-md-0 order-1 geo-shadow margin-class">
                <div>
                    <h4 class="text-center text-black mt-2">Created staches</h4>
                </div>
                <section class="row justify-content-around my-2">
                    <button @click="pChangePage(pageNumber - 1)" :disabled="pageNumber <= 1"
                        class="col-5 bgNew rounded search">
                        <i class="mdi mdi-arrow-left"></i> Recent
                    </button>
                    <button @click="pChangePage(pageNumber + 1)" :disabled="pageNumber >= totalPages"
                        class="col-5 bgNew rounded search">
                        Vintage <i class="mdi mdi-arrow-right"></i>
                    </button>
                </section>
                <div v-for="s in activeProfileStaches" :key="s.id" class="fs-4">

                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"
                        aria-controls="myCreated"></b-pagination>
                    <b-table id="myCreated" :per-page="perPage" :current-page="currentPage">
                        <ActiveProfileStacheCard :stache="s" />

                    </b-table>
                </div>
            </div>
            <div class="col-12 borderChange col-md-3 card geo-shadow order-md-1 order-0 ">
                <h4 class="text-center mt-2 bgNew rounded">{{ profile.name }}</h4>
                <img class="elevation-5 rounded" :src="profile.picture" alt="">
                <p class="m-2">{{ profile.bio }}</p>
                <p class=" bgNew rounded text-center">{{ profile.email }}</p>
            </div>
            <!-- STUB off canvas for Found Staches
            <div class="col-12 col-md-3 geo-shadow order-2 my-md-4">
                <h4 class="text-center mt-2">Found staches</h4>
            </div> -->
        </section>
        <!-- STUB Todos Off Canvas -->
        <section class="pt-5 row justify-content-around pb-5">
            <!-- <div class="col-12 col-md-3 geo-shadow margin-class">
                <h4 class="text-center mt-2">Todos</h4>
            </div> -->
            <!-- <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                aria-controls="offcanvasExample">
                Link with href
            </a> -->
            <div class="p-3 text-center">
                <button class="col-4 p-2 todoButton" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    View {{ profile.name }}'s to do list
                </button>
            </div>

            <section>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel">
                    <div class="offcanvas-header bg-secondary">
                        <h5 class="offcanvas-title text-black fw-bold fs-3 offset-1 " id="offcanvasExampleLabel">{{
                            profile.name }}'s
                            stache
                            goals</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body bg-primary txt-DrkGreen">

                        <div v-for="adventure in myAdventures" :key="adventure.id" class="">
                            <ToDoCard :adventure="adventure" />
                        </div>
                    </div>

                </div>
            </section>
            <!-- STUB Badges Off Canvas -->

        </section>
    </section>
    <section class=" adventure-card">
        <h4 class="text-center bg-warning fw-bold border border-dark border-3 rounded mt-2">Badges</h4>
        <div class=" d-flex">

            <div v-for="adventure in myAdventures" :key="adventure.id" class=" bgToDo2">
                <BadgeTemplate :adventure="adventure" />
            </div>
        </div>
    </section>
</template>

<script>
import { computed, popScopeId } from 'vue'
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from "../services/ProfilesService.js";
import { adventuresService } from '../services/AdventuresService';
import { stachesService } from '../services/StachesService'
import { logger } from '../utils/Logger.js';


export default {
    setup() {
        // TODO onMounted get Profile by the profileId in route params

        const route = useRoute()
        onMounted(() => {
            getProfileById()
            getStachesByProfileId()
            // TODO get adventures by profile id...this is already written in profile service
        }),

            async function getAdventuresByStacheId() {
                try {
                    await adventuresService.getAdventuresByStacheId(route.params.stacheId)
                } catch (error) {
                    Pop.error(error)
                }

            }
        async function getProfileById() {
            try {
                await accountService.getProfileById(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getStachesByProfileId() {
            try {
                await profilesService.getStachesByProfileId(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            profile: computed(() => AppState.profile),
            user: computed(() => AppState.user),
            // ANCHOR DO NOT USE THE WORD ACCOUNT ON THIS PAGE UNLESS YOU ARE USING THE PERSON LOGGED IN
            // account: computed(() => AppState.account),
            // staches: computed(() => AppState.staches),
            activeProfileStaches: computed(() => AppState.activeProfileStaches),
            myAdventures: computed(() => AppState.myAdventures),
            // perPage: 7,
            // currentPage: 1,
            pageNumber: computed(() => AppState.pPageNumber),
            totalPages: computed(() => AppState.pTotalPages),
            nextUrl: computed(() => AppState.nextUrl),
            previousUrl: computed(() => AppState.previousUrl),

            async ChangePage(url) {
                try {
                    logger.log('changing page', url)
                    await stachesService.ChangePage(url)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style lang="scss" scoped>
.geo-shadow {
    //     backdrop-filter: blur(20px);
    //     border-radius: 10px;
    //     /* width: 100%; */
    //     /* object-fit: cover;
    //   object-position: center; */
    //     box-shadow: 0 3px 3px -1px rgba(133, 133, 133, 0.85),
    //         0 5px 6px 0 rgba(133, 133, 133, 0.79),
    //         0 1px 8px 0 rgba(133, 133, 133, 0.79);

    background: var(--Sand);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5.3px);
    -webkit-backdrop-filter: blur(5.3px);
    border: 1px solid var(--Green);
}

.badge-pic2 {
    width: 82px;
    height: 82px;

}

.glassCard2 {
    /* From https://css.glass */
    background: rgba(139, 141, 104, 0.857);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 4px solid rgba(47, 28, 2, 0.345);
}

.bgNew {
    padding: 3px;
    background: #527a5cb0;
}

.borderChange {
    border: 2px solid #171f15;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(76, 101, 77, 0.792);
}

.adventure-card {
    background: #41644ab2;
    border: 3px solid #171f15;
    border-radius: 15px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(53, 102, 55, 0.792);
}
</style>
<style>
@media(max-width: 768px) {
    .margin-class {
        margin: 30px;
    }
}

.adventure-content {
    padding: 10px;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    border-radius: 10px;
    background-color: #b4c2b7;
}

.todoButton {
    background: linear-gradient(45deg, var(--LghtGreen), var(--Green));
    border-radius: 20px;
    padding: 2px;
    transform: background 0.3s, transform 0.2s;
}

.todoButton:hover {
    background: linear-gradient(45deg, var(--Green), var(--LghtGreen));
    transform: scale(1.1);
}

.leftStache {
    object-fit: contain;
}
</style>
