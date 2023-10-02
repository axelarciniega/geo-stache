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
    hello
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState.js';


export default {
    setup() {
        // const route = useRoute()

        return {
            profiles: computed(() => AppState.staches),
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),


        };
    },
};
</script>


<style></style>