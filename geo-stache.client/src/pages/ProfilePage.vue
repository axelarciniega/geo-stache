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

<h1 class="text-center">{{ account.name }}'s profile page</h1>\
<section class="row justify-content-around">
    <div class="col-12 col-md-3 card">
        <h4 class="text-center">Created staches</h4>
        <div v-for="s in myStaches" :key="s.id" >
            <StacheCard :stache="s.stache"/>
        </div>
    </div>
    <div class="col-12 col-md-3 card">
        <h4 class="text-center">Found staches</h4>
    </div>
    <div class="col-12 col-md-3 card">
        <h4 class="text-center">Profile details</h4>
        {{ account.name }}
        <img :src="account.picture" alt="">
        {{ account.bio }}
        {{ account.email }}
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
<!-- {{ account.badgeCount }} -->
<!-- {{ account.todoCount }} -->

</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import {watchEffect,onMounted} from 'vue';

export default {
    setup() {
        // const route = useRoute()
onMounted(()=>{
    getMyStaches()
})
async function getMyStaches(){
    try {
        await accountService.getMyStaches()
    } catch (error) {
        Pop.error(error)
    }
}
        return {
            myStaches: computed(()=> AppState.myStaches),
            profiles: computed(() => AppState.staches),
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            staches: computed(()=> AppState.staches)

        };
    },
};
</script>


<style></style>