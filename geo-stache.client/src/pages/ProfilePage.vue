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
        <section class="row justify-content-around">
            <div class="col-12 col-md-3 card">
                <h4 class="text-center">Created staches</h4>
                <div v-for="s in myStaches" :key="s.id">
                    <StacheCard :stache="s.stache" />
                </div>
            </div>
            <div class="col-12 col-md-3 card">
                <h4 class="text-center">Profile details</h4>
                <img :src="profile.picture" alt="">
                <h3 class="text-center my-2">{{ profile.name }}</h3>
                {{ profile.bio }}
                {{ profile.email }}
            </div>
            <div class="col-12 col-md-3 card">
                <h4 class="text-center">Found staches</h4>
            </div>
        </section>
        <section class="pt-5 row justify-content-around pb-5">
            <div class="col-12 col-md-3 card">
                <h4 class="text-center">Todos</h4>
            </div>
            <div class="col-12 col-md-6 card">
                <h4 class="text-center">Badges</h4>
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
                await profilesService.getStacheByProfileId(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            profile: computed(() => AppState.profile),
            user: computed(() => AppState.user),
            // ANCHOR DO NOT USE THE WORD ACCOUNT ON THIS PAGE UNLESS YOU ARE USING THE PERSON LOGGED IN
            // account: computed(() => AppState.account),
            staches: computed(() => AppState.staches)

        };
    },
};
</script>


<style lang="scss" scoped>
.geo-shadow {
    backdrop-filter: blur(20px);
    border-radius: 10px;
    /* width: 100%; */
    /* object-fit: cover;
  object-position: center; */
    box-shadow: 0 3px 3px -1px rgba(43, 43, 43, 0.85),
        0 5px 6px 0 rgba(43, 43, 43, 0.79),
        0 1px 8px 0 rgba(43, 43, 43, 0.79);
}
</style>