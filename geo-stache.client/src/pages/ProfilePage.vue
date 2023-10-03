<!-- FIXME Put button on Account Page to Link to Profile page. -->
<template>
    <!-- <div class="container p-2 g-4 my-3">
        v-if="user.isAuthenticated"
        <section class="row mt-2 justify-content-around">
            <div class="col-3 rounded elevation-1 p-2 geo-shadow">
                <h3 class="">Hello Adventurer!</h3>
                <h3 class="">{{ profile.name }}</h3>
                <img class="profile-pic geo-shadow" :src="profile.picture" alt="" />
                <p>{{ profile.email }}</p>
            </div>
            <div class="col-7 rounded elevation-1 p-2 geo-shadow">
                <MapCard />
            </div>
            <div class="divider"></div>
            Bottom Section Edit Account
            <div class="elevation-1 rounded p-2 geo-shadow">
            </div>
        </section>
    </div> -->
    <!-- STUB -->
    <section class="container">
        <h1 class="text-center">{{ profile.name }}'s profile page</h1>
        <section class="row justify-content-around mt-5">
            <div class="col-12 col-md-3 my-md-4 order-md-0 order-1 geo-shadow margin-class">
                <h4 class="text-center mt-2 ">Created staches</h4>
                <div v-for="s in activeProfileStaches" :key="s.id">
                    <ActiveProfileStacheCard :stache="s" />
                </div>
            </div>
            <div class="col-12 col-md-3 card geo-shadow order-md-1 order-0 ">
                <h4 class="text-center mt-2 ">Profile details</h4>
                <img :src="profile.picture" alt="">
                {{ profile.bio }}
                <p class="m-2">{{ profile.email }}</p>
            </div>
            <div class="col-12 col-md-3 geo-shadow order-2 my-md-4">
                <h4 class="text-center mt-2">Found staches</h4>
            </div>
        </section>
        <section class="pt-5 row justify-content-around pb-5">
            <div class="col-12 col-md-3 geo-shadow margin-class">
                <h4 class="text-center mt-2">Todos</h4>
            </div>
            <div class="col-12 col-md-6 geo-shadow">
                <h4 class="text-center mt-2">Badges</h4>
            </div>
        </section>
        <!-- {{ profile.badgeCount }} -->
        <!-- {{ profile.todoCount }} -->
    </section>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from "../services/ProfilesService.js";



export default {
    setup() {
        // TODO onMounted get Profile by the profileId in route params

        const route = useRoute()
        onMounted(() => {
            getProfileById()
            getStachesByProfileId()
            // TODO get adventures by profile id...this is already written in profile service
        })

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
            activeProfileStaches: computed(() => AppState.activeProfileStaches)
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

background: #f2e3db;
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.3px);
-webkit-backdrop-filter: blur(5.3px);
border: 1px solid rgba(65, 100, 74, 1);
}
</style>
<style>

@media(max-width: 768px){
    .margin-class{
        margin: 30px;
    }
}


</style>
