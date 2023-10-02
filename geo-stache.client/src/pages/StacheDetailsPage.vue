<template>
    <div v-if="stache">
        <section class="container">
            <div class="row border border-black border-3">

                <div class="col-12 col-md-7">
                    <h1 class="text-center">{{ stache.stacheName }}</h1>
                    <!-- <router-link :to="{ name: 'Profile', params: { profileId: stache.creatorId } }"> -->
                    <router-link :to="{ path: `accounts/${account.id}` }">
                        <h3 class="text-end"> {{ stache.creator.name }} <img class="profile-pic"
                                :src="stache.creator.picture">
                        </h3>
                    </router-link>
                    <p class="text-center">Description: {{ stache.description }}</p>
                    <p class="text-center">Difficulty: {{ stache.difficulty }}</p>
                    <p class="text-center">Hint: {{ stache.hint }}</p>
                    <!-- <p class="text-center">Badge Image: <img :src="stache.badgeImage" alt=""></p> -->
                    <p class="text-center">lat: {{ stache.lat }} || long: {{ stache.lng }}</p>
                    <!-- <p class="text-center">Creator: {{ stache.creator.name}}</p> -->
                    <button @click="addToDo()"><i class="mdi mdi-plus
                        "></i>
                    </button>Add this Stache to your Adventure List!
                </div>
                <div class="col-12 col-md-5 p-0 m-0"><img class="stacheImage" :src="stache.coverImage" alt="">
                </div>
                <div class="justify-content-around d-flex">
                    <button v-show="account.id == stache.creatorId" @click="editStache"
                        class=" button-class border border-1 border-black col-2">
                        edit <i class="mdi mdi-icon"></i>
                    </button>
                    <button v-show="account.id == stache.creatorId" @click="deleteStache"
                        class=" delete-button border border-1 border-black col-2 text-black">
                        delete <i class="mdi mdi-icon"></i>
                    </button>
                </div>
            </div>
        </section>


        <!-- STUB Comment section -->
        <section class="row">
            <CommentForm />

            <div class="my-4" v-for="comment in stacheComments" :key="comment.id">
                <!-- STUB Comment Card -->
                <!-- <CommentCard :stacheComment="comment"/> -->
                <div class="container">
                    <section class="row">
                        <div class="col-12 col-md-1">
                            <img class="profile-pic" :src="comment.creator.picture" alt="">
                        </div>
                        <div class="card elevation-5 col-12 col-md-6 my-2">
                            <b>{{ comment.creator.name }}</b>
                            <p>{{ comment.body }}</p>
                            <div class="text-end" v-if="account.id == comment.creatorId">
                                <button class="delete-button" @click="removeComment">delete</button>
                            </div>
                        </div>
                    </section>
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
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';


export default {


    setup() {
        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            getStacheById();
            getCommentsByStache()
        })

        async function getCommentsByStache() {
            try {
                await commentsService.getCommentsByStache(route.params.stacheId)
            } catch (error) {
                Pop.error(error)
            }
        }

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
            stacheComments: computed(() => AppState.stacheComments),

            async removeComment() {
                try {
                    if (await Pop.confirm()) {
                        let comment = AppState.stacheComments.find(c => c.accountId == AppState.stacheComments.accountId)
                        await commentsService.removeComment(comment.id)
                        Pop.success('removed comment')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            },

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
            },

            // NOTE refer to album page createCollab. I progress means they have added to thier ToDo list, but have not yet completed or FOUND the Stache.
            // NOTE Do we want the user to be able to remove once the Stache is already found?
            // async addStacheToTODOList() {
            //     try {
            //         logger.log('clicked add TODO!')
            //         inProgress.value = true
            //         let
            //     } catch (error) {
            //         logger.error(error)
            //         Pop.toast()
            //     }
            // }
        };
    },
};
</script>


<style scoped lang="scss">
.button-class {
    background: linear-gradient(25deg, #41644A, #adc7b3);
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s
}

.button-class:hover {
    background: linear-gradient(25deg, #adc7b3, #41644A);
    transform: translateY(-5px);
}

.delete-button {
    background: linear-gradient(25deg, #E86A33, #e68b64);
    border-radius: 20px;
    transition: background 0.3s, transform 0.2s;
}

.delete-button:hover {
    background: linear-gradient(25deg, #e68b64, #E86A33);
    transform: translateY(-5px);
}

.profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.stacheImage {
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>